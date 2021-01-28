from typing import List


class AppValidationErrorItem:
    def __init__(self, *, field: str, msg: str) -> None:
        self.field = field
        self.msg = msg


class AppValidationError(Exception):
    def __init__(self, errors: List[AppValidationErrorItem]) -> None:
        self.errors = errors
