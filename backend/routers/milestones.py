# All end points for user related operations
from fastapi import APIRouter, File, UploadFile
import models
from fastapi import Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from database import SessionLocal


class Milestones(BaseModel):
    description: str
    title: str
    owner_id: str
    # image


router = APIRouter(
    prefix="/millstones",
    tags=["millstones"],
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
async def create_milestone(
    milestones: Milestones, file: UploadFile = File(...), db: Session = Depends(get_db)
):

    db_milestone = models.Milestones()
    db_milestone.description = milestones.description
    db_milestone.title = milestones.title
    db_milestone.owner_id = milestones.owner_id

    #  do stuff

    db_milestone.s3_object = "put stuff here"
    db_milestone.date = "put stuff here"

    db.add(db_milestone)
    db.commit()

    return db_milestone


@router.get("/all")
async def get_all_millstones():

    return {"message": "Hello World"}
