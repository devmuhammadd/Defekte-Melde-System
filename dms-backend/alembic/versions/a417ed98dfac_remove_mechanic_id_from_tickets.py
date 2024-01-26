"""Remove mechanic_id from tickets

Revision ID: a417ed98dfac
Revises: 2be758583cd6
Create Date: 2023-12-27 23:04:03.214703

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'a417ed98dfac'
down_revision: Union[str, None] = '2be758583cd6'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.drop_column('tickets', 'mechanic_id')


def downgrade() -> None:
    op.add_column('tickets', sa.Column('mechanic_id', sa.Integer(),
                  sa.ForeignKey('users.id'), nullable=False))
