from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = "VIP Clone API"
    database_url: str = "mysql+pymysql://root:password@localhost:3306/stock"
    jwt_secret: str = "change-me"
    jwt_exp_minutes: int = 60 * 24


settings = Settings()
