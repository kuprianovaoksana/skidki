from main.models import Product, ProductHistory


class Magic:
    """
    Класс Magic используется для проверки и обновления информации о продукте в базе данных.
    """

    def __init__(self, price, product):
        self.price = price
        self.product = product

    def check_product_history_table(self):
        """
        Функция проверяет, есть ли запись в таблице ProductHistory для данного продукта.
        :return: логическое значение.
        """
        return bool(ProductHistory.objects.filter(product_id=self.product))

    def add_product_history(self):
        """
        Функция add_product_history проверяет, существует ли таблица истории продуктов, и если да,
        то добавляет новую запись с обновленной ценой для данного продукта.
        """
        if self.check_product_history_table():
            exist = ProductHistory.objects.filter(product_id=self.product).last()
            if exist.updated_price == self.price:
                pass
            else:
                ProductHistory.objects.create(product_id=self.product, updated_price=self.price)
                Product.objects.filter(pk=self.product.url).update(current_price=self.price)
        else:
            pass
