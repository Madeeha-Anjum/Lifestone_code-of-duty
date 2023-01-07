from typing import Optional
from fastapi import FastAPI, Depends, HTTPException
from routers import user
import models
from pydantic import BaseModel
from uuid import UUID
from sqlalchemy.orm import Session
from database import engine, SessionLocal

app = FastAPI()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


app.include_router(user.router)

# Creates the database tables if they don't exist
models.Base.metadata.create_all(bind=engine)


# pydantic schema for users
class User(BaseModel):
    wallet_id: int
    username: str
    friend_requests: str
    friends: str


@app.post("/user")
def create_user(user: User, db: Session = Depends(get_db)):
    db_user = models.User()
    db_user.wallet_id = user.wallet_id
    db_user.username = user.username
    db_user.friend_requests = user.friend_requests
    db_user.friends = user.friends

    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


@app.get("/users")
def get_users(db: Session = Depends(get_db)):
    db_users = db.query(models.User).all()
    if db_users is None:
        raise HTTPException(status_code=404, detail="NO USERS")
    return db_users
