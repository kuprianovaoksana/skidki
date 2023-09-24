from main.models import Category, Brand, Shop


class Filter:
    """
    Класс Filter используется для фильтрации и создания объектов в моделях «Категория», «Бренд» и «Магазин» на основе
    указанных категорий, брендов и названий магазинов.
    """

    def __init__(self, category="", brand="", shop=""):
        self.category = category.lower()
        self.brand = brand.lower()
        self.shop = shop.lower()

    def db_category(self):
        return bool(Category.objects.filter(name=self.category))

    def db_brand(self):
        return bool(Brand.objects.filter(name=self.brand))

    def db_shop(self):
        return bool(Shop.objects.filter(name=self.shop))

    def filter_category(self):
        if self.db_category():
            pass
        else:
            Category.objects.create(name=self.category)

    def filter_brand(self):
        if self.db_brand():
            pass
        else:
            Brand.objects.create(name=self.brand)

    def filter_shop(self):
        if self.db_shop():
            pass
        else:
            Shop.objects.create(name=self.shop)

    def filter_all(self):
        self.filter_category()
        self.filter_brand()
        self.filter_shop()
