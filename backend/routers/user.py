# All end points for user related operations
from fastapi import APIRouter

router = APIRouter(
    prefix="/users",
    tags=["users"],
    responses={404: {"description": "Not found"}},
)


@router.get("/")
async def get_user():
    return {"message": "Hello World From /users"}
