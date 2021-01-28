import inflect


def plural(word: str) -> str:
    return inflect.engine().plural(word)
