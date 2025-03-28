import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';

export default async function cathandler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    let browser;
    try {
        browser = await puppeteer.launch({
            args: chromium.args,
            executablePath: await chromium.executablePath(),
            headless: true
        });

        const page = await browser.newPage();
        await page.goto('https://thecatconnection.org/adopt/available-cats/', {
            waitUntil: 'domcontentloaded'
        });

        // Wait for cat names and images to load
        await page.waitForSelector('.images img.petfinder-big-img', { timeout: 10000 });

        // Extract all cat names
        const cats = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('h2.name')).map(cat => cat.textContent.trim());
        });

        // Extract all image URLs
        const images = await page.evaluate(() => {
            const imgElements = Array.from(document.querySelectorAll('.images img.petfinder-big-img'));
            return imgElements.map(img => img.getAttribute('src'));
        });

        // Combine names and image URLs
        const catData = cats.map((name, index) => ({
            name,
            image_url: images[index] || ''
        }));

        await browser.close();

        return res.json(catData); // Return all cats with their image URLs
    } catch (error) {
        if (browser) await browser.close();
        return res.status(500).json({ error: error.message });
    }
}
