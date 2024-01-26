"""Remove mechanic_id from tickets

Revision ID: 5e3d2f106c9a
Revises: ecadeeb1dbd7
Create Date: 2024-01-25 00:49:25.525279

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '5e3d2f106c9a'
down_revision: Union[str, None] = 'ecadeeb1dbd7'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.drop_column('tickets', 'mechanic_id')


def downgrade() -> None:
    op.add_column('tickets', sa.Column('mechanic_id', sa.Integer(),
                  sa.ForeignKey('users.id'), nullable=False))
