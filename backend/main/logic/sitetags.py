# Словарь тегов определяет сопоставление между URL-адресом и словарем тегов. В данном случае URL-адрес —
# «https://sunlight.net/», а словарь тегов имеет одну пару «ключ-значение». Ключ — «current_price», а значение — список
# имен классов CSS, которые будут использоваться для поиска текущей цены на веб-странице.
# Метод `split()` используется для разделения строки имен классов на список.

tags = {
    "https://sunlight.net/": {"current_price": "div supreme-product-card__price-discount-price".split()},
}

# sites = [
#     "http://aliexpress.ru/",
#     "https://www.kolesa-darom.ru/",
#     "https://sunlight.net/",
#     "https://megamarket.ru/",
#     "https://www.labirint.ru/",
#     "https://santehnika-online.ru/",
#     "https://www.askona.ru/",
#     "https://www.autodoc.ru/",
#     "https://www.shoppinglive.ru/",
#     "https://apteka-ot-sklada.ru/",
#     "https://minicen.ru/",
#     "https://www.ursus.ru/",
#     "https://iledebeaute.ru/",
# ]
