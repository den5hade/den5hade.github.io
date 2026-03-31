---
title: "Alembic from Obsidian (test)"
date: 2026-03-30
tags: ["alembic", "migration", "sqlmodel"]
description: "A practical, SSH-first walkthrough to run FastAPI on EC2."
---

[BugBytes](https://www.youtube.com/watch?v=zTSmvUVbk8M)

```bash
uv add alembic
```
```bash
alembic init migrations
# migrations name of folder
```
we need to add import in to script.py.mako file
```python
# script.py.mako
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

import sqlmodel # <---!!!

${imports if imports else ""}
```
also in migrations/env.py file we need to add import
```python
# migrations/env.py
from logging.config import fileConfig

from sqlalchemy import engine_from_config
from sqlalchemy import pool
from sqlmodel import SQLModel # <---!!!
from alembic import context

from models import User, Manager # <---!!!

...

# add your model's MetaData object here

# for 'autogenerate' support

# from myapp import mymodel

# target_metadata = mymodel.Base.metadata

target_metadata = SQLModel.metadata # <---!!!
```
and we need to add DATABASE_URL in alembic.ini directly
```ini
# database URL. This is consumed by the user-maintained env.py script only.

# other means of configuring database URLs may be customized within the env.py

# file.

sqlalchemy.url = driver://user:pass@localhost/dbname <---!!!
```
or we can add it in to migrations/env.py
```python
# migrations/env.py
from logging.config import fileConfig

from sqlalchemy import engine_from_config
from sqlalchemy import pool
from sqlmodel import SQLModel # <---!!!
from pathlib import Path # <---!!!

from alembic import context

from models import User, Manager # <---!!!

# this is the Alembic Config object, which provides
# access to the values within the .ini file in use.
config = context.config

# ---->>>>> только синхронный путь к бд <<<<<<------

DB_PATH = str((Path().parent / "data/local-dev-sqlite.db").resolve()) # <---!!!
config.set_main_option('sqlalchemy.url', f'sqlite:///{DB_PATH}') # <---!!!
# database_url = os.getenv("DATABASE_URL")
```

```python

...

# add your model's MetaData object here
# for 'autogenerate' support
# from myapp import mymodel
# target_metadata = mymodel.Base.metadata

target_metadata = SQLModel.metadata # <---!!!


```
дальше нам нужно создать ревизию, так же ревизия создается после внесения изменений в модели, при создании можно добавить сообщение, как при комите
```bash
alembic revision --autogenerate -m "Message"
```
чтобы обновить все до последней версии
```bash
alembic upgrade head
```
