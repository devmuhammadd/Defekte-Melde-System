"""Renaming user table to users

Revision ID: 153bc9493932
Revises: 0da5750b1693
Create Date: 2023-11-23 08:57:09.207540

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '153bc9493932'
down_revision: Union[str, None] = '0da5750b1693'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.rename_table('user', 'users')


def downgrade() -> None:
    op.rename_table('users', 'user')
