# All end points for user related operations
from fastapi import APIRouter, File, UploadFile, Form
import models
from fastapi import Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from database import SessionLocal
from datetime import datetime
import uuid
import shutil


router = APIRouter(
    prefix="/friends",
    tags=["friends"],
    responses={404: {"description": "Not found"}},
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/request")
async def send_friend_request_or_accept_friend_request(from_id: str = Form(), to_id: str = Form(), db: Session = Depends(get_db)):
    requester = db.query(models.User).filter(models.User.wallet_id == from_id).one()
    requester_friend_requests = requester.friend_requests
    receiver = db.query(models.User).filter(models.User.wallet_id == to_id).one()
    if not (to_id in requester.friends.split(',') or from_id in receiver.friends.split(',') or from_id in receiver.friend_requests.split(',')):
        # They're not already friends, or this request has already been sent so this would be a duplicate request
        if to_id in requester_friend_requests.split(','):
            # The person they're sending a request to had already sent them a request, so they have now become friends!
            # Remove the request the other person sent to them
            requester.friend_requests = ','.join([x for x in requester_friend_requests.split(',') if x != to_id])
            # Add the friends to each of their friend lists
            if requester.friends == '':
                requester.friends = to_id
            else:
                requester.friends += ',' + to_id
            if receiver.friends == '':
                receiver.friends = from_id
            else:
                receiver.friends += ',' + from_id
        else:
            # They're the one making the first move to add them as a friend
            # Put their request in the friend requests of the other person
            if receiver.friend_requests == '':
                receiver.friend_requests = from_id
            else:
                receiver.friend_requests += ',' + from_id
    db.commit()
    return

@router.post("/delete")
async def delete_friend_or_cancel_request_or_deny_request(self_id: str = Form(), friend_to_delete_id: str = Form(), db: Session = Depends(get_db)):
    # A deleting B as a friend means whether or not they're just requesting friends from each other or they're already friends, A and B get wiped from each other's requests as well as friend lists.
    # Deleting a friend can serve as cancelling a request, or rejecting a request, or removing each other as friends
    self_record = db.query(models.User).filter(models.User.wallet_id == self_id).one()
    self_friends = self_record.friends
    if friend_to_delete_id in self_friends.split(','):
        self_record.friends = ','.join([x for x in self_friends.split(',') if x != friend_to_delete_id])
    self_friend_requests = self_record.friend_requests
    if friend_to_delete_id in self_friend_requests.split(','):
        self_record.friend_requests = ','.join([x for x in self_friend_requests.split(',') if x != friend_to_delete_id])

    friend_to_delete_record = db.query(models.User).filter(models.User.wallet_id == friend_to_delete_id).one()
    friend_to_delete_record_friends = friend_to_delete_record.friends
    if self_id in friend_to_delete_record_friends.split(','):
        friend_to_delete_record.friends = ','.join([x for x in friend_to_delete_record_friends.split(',') if x != self_id])
    friend_to_delete_friend_requests = friend_to_delete_record.friend_requests
    if self_id in friend_to_delete_friend_requests.split(','):
        friend_to_delete_record.friend_requests = ','.join([x for x in friend_to_delete_friend_requests.split(',') if x != self_id])

    db.commit()
    return

@router.get("/friends")
async def get_friends_of_user(db: Session = Depends(get_db), user_id: str = ''):
    self_record = db.query(models.User).filter(models.User.wallet_id == user_id).one()
    if self_record is None:
        raise HTTPException(status_code=404, detail="USER DOESN'T EXIST")
    return self_record.friends

@router.get("/incomingrequests")
async def get_friend_requests_to_user(db: Session = Depends(get_db), user_id: str = ''):
    self_record = db.query(models.User).filter(models.User.wallet_id == user_id).one()
    if self_record is None:
        raise HTTPException(status_code=404, detail="USER DOESN'T EXIST")
    return self_record.friend_requests
