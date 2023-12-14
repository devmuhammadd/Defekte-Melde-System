"""Remove station_id from users

Revision ID: 5fb1dfdc3c3a
Revises: 03fa17dfb242
Create Date: 2023-12-05 08:41:21.082331

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '5fb1dfdc3c3a'
down_revision: Union[str, None] = '03fa17dfb242'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.drop_column('users', 'station_id')


def downgrade() -> None:
    op.add_column('users', sa.Column('station_id', sa.Integer, nullable=True))
