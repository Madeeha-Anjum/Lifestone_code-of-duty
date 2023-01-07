from fastapi import FastAPI
from routers import user, milestones
import models
from database import engine

app = FastAPI()

# Creates the database tables if they don't exist
models.Base.metadata.create_all(bind=engine)

app.include_router(user.router)
app.include_router(milestones.router)
