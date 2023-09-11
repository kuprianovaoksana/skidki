class MainExpectation:
    """
    В классе MainExpectation есть метод бинокля, который возвращает входной элемент, если он существует,
    в противном случае он возвращает «Не найден!».
    """

    @classmethod
    def binoculars(cls, element):
        try:
            element
        except AttributeError:
            return "Not found!"
        else:
            return element
