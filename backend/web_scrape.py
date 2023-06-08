# importing the necessary packages
import requests
from bs4 import BeautifulSoup


def page_content(page_url):

    url = page_url

    request = requests.get(url)
    coverpage = request.content

    # print(coverpage)

    soup = BeautifulSoup(coverpage, 'html5lib')
    all_paragraphs = soup.find_all('p')

    text = ""
    for p in all_paragraphs:
        text += p.get_text().strip()
        text += " "

    return text

