from datetime import datetime
from typing import Optional

from phonenumbers import (
    NumberParseException,
    PhoneNumberType,
    is_valid_number,
    number_type,
    parse as parse_phone_number,
)
from pydantic import BaseModel, EmailStr, constr, validator


# Shared properties


class UserBase(BaseModel):
    email: EmailStr
    phone: constr(max_length=50, strip_whitespace=True)
    name: constr(max_length=255, strip_whitespace=True)

    @validator('phone')
    def check_phone(cls, v):
        try:
            n = parse_phone_number(v, 'CN')
        except NumberParseException as e:
            raise ValueError('Please provide a valid mobile phone number')

        if not is_valid_number(n) or number_type(n) not in (PhoneNumberType.MOBILE,
                                                            PhoneNumberType.FIXED_LINE_OR_MOBILE):
            raise ValueError('Please provide a valid mobile phone number')

        return n.national_number


class UserCreate(UserBase):
    password: str


class UserUpdate(UserBase):
    password: Optional[str] = None


class UserInDBBase(UserBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        orm_mode = True


# Additional properties to return via API
class User(UserInDBBase):
    pass


# Additional properties stored in DB
class UserInDB(UserInDBBase):
    password: str
