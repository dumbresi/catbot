from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

def get_cat_data(cat_name):
    options = webdriver.ChromeOptions()
    options.add_argument('--headless')
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')

    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=options)

    try:
        driver.get('URL_OF_THE_WEBSITE')
        driver.get('https://thecatconnection.org/adopt/available-cats/')
        cats=driver.find_elements(By.XPATH,'//h2[@class="name"]')
        image_elements = driver.find_elements(By.CLASS_NAME, "petfinder-big-img")
        image_urls = [img.get_attribute("src") for img in image_elements]
        cat_list = []
        for p in range(len(cats)):
            cat_list.append(cats[p].text)
        
        # Find matching cat name (case-insensitive, allows partial match)
        for idx, catname in enumerate(cat_list):
            if cat_name.lower() in catname.lower():
                return {'name': catname, 'image_url': image_urls[idx]}
            
        return {'name': cat_name, 'image_url': ''}
    finally:
        driver.quit()
