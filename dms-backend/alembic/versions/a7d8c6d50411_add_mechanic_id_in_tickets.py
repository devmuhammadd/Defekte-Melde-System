"""Add mechanic_id in tickets

Revision ID: a7d8c6d50411
Revises: 5e3d2f106c9a
Create Date: 2024-01-25 00:49:57.697958

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'a7d8c6d50411'
down_revision: Union[str, None] = '5e3d2f106c9a'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column('tickets', sa.Column('mechanic_id', sa.Integer(),
                  sa.ForeignKey('users.id'), nullable=True))


def downgrade() -> None:
    op.drop_column('tickets', 'mechanic_id')
