import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { name } = req.query;
    if (!name) {
        return res.status(400).json({ error: 'Missing cat name' });
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

        const cats = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('h2.name')).map(cat => cat.textContent.trim());
        });

        const images = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('.petfinder-big-img img')).map(img => img.src);
        });

        await browser.close();

        // Match the cat name (case-insensitive, allows partial match)
        for (let i = 0; i < cats.length; i++) {
            if (cats[i].toLowerCase().includes(name.toLowerCase())) {
                return res.json({ name: cats[i], image_url: images[i] || '' });
            }
        }

        return res.json({ name, image_url: '' });
    } catch (error) {
        if (browser) await browser.close();
        return res.status(500).json({ error: error.message });
    }
}
