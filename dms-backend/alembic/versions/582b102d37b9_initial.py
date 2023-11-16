"""initial

Revision ID: 582b102d37b9
Revises: f0fa640f915f
Create Date: 2023-11-16 21:00:56.733346

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '582b102d37b9'
down_revision: Union[str, None] = 'f0fa640f915f'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
