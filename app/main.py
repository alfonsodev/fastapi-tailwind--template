from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fasthx import Jinja
from pydantic import BaseModel

# Pydantic model of the data the example API is using.
class User(BaseModel):
    first_name: str
    last_name: str

app = FastAPI()

app.mount("/dist", StaticFiles(directory="app/dist"), name="dist")
templates = Jinja2Templates(directory="app/templates")

# Create a FastHX Jinja instance that will serve as your decorator.
jinja = Jinja(templates)

@app.get("/")
async def read_index(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

# FastHX Templating Example Routes
@app.get("/examples/fasthx-templating")
@jinja.page("examples/fasthx-templating.html")
def fasthx_templating_example() -> None:
    ...

@app.get("/examples/fasthx-templating/user-list")
@jinja.hx("user-list.html")
async def htmx_or_data() -> list[User]:
    return [
        User(first_name="John", last_name="Lennon"),
        User(first_name="Paul", last_name="McCartney"),
        User(first_name="George", last_name="Harrison"),
        User(first_name="Ringo", last_name="Starr"),
    ]

@app.get("/examples/fasthx-templating/admin-list")
@jinja.hx("user-list.html", no_data=True)
def htmx_only() -> list[User]:
    return [User(first_name="Billy", last_name="Shears")]
