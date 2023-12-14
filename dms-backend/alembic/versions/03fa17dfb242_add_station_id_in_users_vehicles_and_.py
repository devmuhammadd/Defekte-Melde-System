"""Add station_id in users, vehicles, and rooms

Revision ID: 03fa17dfb242
Revises: b125bb634eb0
Create Date: 2023-12-05 08:13:15.660446

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '03fa17dfb242'
down_revision: Union[str, None] = 'b125bb634eb0'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

new_column = sa.Column('station_id', sa.Integer,
                       nullable=False, server_default='1')

tables = ['users', 'vehicles', 'rooms']


def upgrade() -> None:
    for table in tables:
        op.add_column(table, new_column)

        op.execute(f"UPDATE {table} SET station_id = 1")


def downgrade() -> None:
    for table in tables:
        op.drop_column(table, 'station_id')
