# All end points for user related operations
from fastapi import APIRouter
import models

from fastapi import Depends, HTTPException
from pydantic import BaseModel
from uuid import UUID
from sqlalchemy.orm import Session
from database import engine, SessionLocal


class User(BaseModel):
    wallet_id: str
    username: str
    friend_requests: str
    friends: str


router = APIRouter(
    prefix="/users",
    tags=["users"],
    responses={404: {"description": "Not found"}},
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

 

@router.post("/create")
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


@router.get("/all")
def get_users(db: Session = Depends(get_db)):
    db_users = db.query(models.User).all()
    if db_users is None:
        raise HTTPException(status_code=404, detail="NO USERS")
    return db_users
