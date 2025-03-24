from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By

cService = webdriver.ChromeService()

driver = webdriver.Chrome(service=cService)
driver.get('https://thecatconnection.org/adopt/available-cats/')
cats=driver.find_elements(By.XPATH,'//h2[@class="name"]')
image_elements = driver.find_elements(By.CLASS_NAME, "petfinder-big-img")

# Extract the 'src' attributes
image_urls = [img.get_attribute("src") for img in image_elements]
# players = driver.find_elements(By.XPATH, '//td[@class="name"]')
cat_list = []
for p in range(len(cats)):
   cat_list.append(cats[p].text)

print(cat_list)
print(image_urls)

driver.close()