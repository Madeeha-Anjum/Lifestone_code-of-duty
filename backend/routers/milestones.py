# All end points for user related operations
from fastapi import APIRouter, File, UploadFile, Form
import models
from fastapi import Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from database import SessionLocal
from datetime import datetime
import uuid
from s3 import upload
import shutil
import os


class Milestones(BaseModel):
    description: str
    title: str
    owner_id: str
    txn_id: str
    # image


router = APIRouter(
    prefix="/milestones",
    tags=["milestones"],
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
    description: str = Form(...),
    title: str = Form(...),
    owner_id: str = Form(...),
    txn_id: str = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    db_milestone = models.Milestones()
    db_milestone.description = description
    db_milestone.title = title
    db_milestone.txn_id = txn_id
    db_milestone.owner_id = owner_id

    # Get a random filename for the image file
    image_filename = str(uuid.uuid4())

    # Write the file to disk
    with open(image_filename, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    # Upload the image file
    upload(image_filename, image_filename)
    # Delete the file from disk
    try:
        os.remove(image_filename)
    except:
        pass

    db_milestone.s3_filename = image_filename
    db_milestone.date = str(datetime.now())

    db.add(db_milestone)
    # db.commit()
    db.flush() # temporary commit to get the id
    # get the id of the newly created milestone
    milestone_id = db_milestone.id
    
    db.commit() # commit the changes to the database

    return milestone_id


@router.get("/all")
async def get_all_milestones(db: Session = Depends(get_db)):
    db_milestones = db.query(models.Milestones).all()
    if db_milestones is None:
        raise HTTPException(status_code=404, detail="NO MILESTONES")
    return db_milestones


@router.get("/user")
async def get_user_milestones(db: Session = Depends(get_db), owner_id: str = ""):
    db_milestones = (
        db.query(models.Milestones).filter(models.Milestones.owner_id == owner_id).all()
    )
    if db_milestones is None:
        raise HTTPException(status_code=404, detail="NO MILESTONES")
    return db_milestones
