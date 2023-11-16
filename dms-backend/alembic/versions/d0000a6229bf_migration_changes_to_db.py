"""migration changes to db

Revision ID: d0000a6229bf
Revises: 582b102d37b9
Create Date: 2023-11-17 00:42:21.359797

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'd0000a6229bf'
down_revision: Union[str, None] = '582b102d37b9'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
