# Backend

## Local Setup

0. `cd backend`
1. Install requirements `pip install -r requirements.txt`
2. Run `python -m uvicorn main:app --reload`
3. Open the backend on `http://localhost:8000`
4. Open the docs on `http://localhost:8000/docs`

### Database Setup

When the backend starts for the first time, it will create a new database file `backend.db` in the root directory. If you want to view the file in the terminal install `sqlite3`[here](https://www.kiltandcode.com/2021/01/21/how-to-install-and-use-sqlite-on-windows/) and run `sqlite3` then `.open backend.db` to open the database.

- To view the tables run `.tables`
