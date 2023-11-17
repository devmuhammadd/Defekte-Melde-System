"""migration changes to db

Revision ID: 1b6a04167125
Revises: d0000a6229bf
Create Date: 2023-11-17 04:46:32.706470

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '1b6a04167125'
down_revision: Union[str, None] = 'd0000a6229bf'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
