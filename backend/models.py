#  create the database models from the Base class in the database.py file

from sqlalchemy import Column, ForeignKey, Integer, String, ARRAY
from sqlalchemy.orm import relationship

from database import Base

# one table for users
class User(Base):
    __tablename__ = "users"

    wallet_id = Column(String, primary_key=True, index=True)
    username: Column(String, nullable=False)
    
    # requests are wallet_ids
    friend_requests = Column(String)
    friends = Column(String)

    # one to many relationship with milestones
    milestone = relationship("Milestones", back_populates="owner")


class Milestones(Base):
    __tablename__ = "milestones"

    id = Column(Integer, index=True, primary_key=True)
    date = Column(String, nullable=False)
    description = Column(String, nullable=False)
    s3_object = Column(String, nullable=False)
    title = Column(String, nullable=False)

    owner_id = Column(Integer, ForeignKey("users.wallet_id"))

    owner = relationship("User", back_populates="milestone")
