"""Add station_id in tickets

Revision ID: 6bd9c0d5941e
Revises: 5fb1dfdc3c3a
Create Date: 2023-12-05 08:42:35.175474

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '6bd9c0d5941e'
down_revision: Union[str, None] = '5fb1dfdc3c3a'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column('tickets', sa.Column(
        'station_id', sa.Integer, nullable=True))
    op.execute(f"UPDATE tickets SET station_id = 1")


def downgrade() -> None:
    op.drop_column('tickets', 'station_id')
