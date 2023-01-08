from fastapi import FastAPI
from routers import user, milestones, friends
import models
from database import engine
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Creates the database tables if they don't exist
models.Base.metadata.create_all(bind=engine)

app.include_router(user.router)
app.include_router(milestones.router)
app.include_router(friends.router)
