"""Add mechanic_id in tickets

Revision ID: ecadeeb1dbd7
Revises: a417ed98dfac
Create Date: 2024-01-25 00:40:28.377602

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'ecadeeb1dbd7'
down_revision: Union[str, None] = 'a417ed98dfac'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column('tickets', sa.Column('mechanic_id', sa.Integer(),
                  sa.ForeignKey('users.id'), nullable=False))


def downgrade() -> None:
    op.drop_column('tickets', 'mechanic_id')
