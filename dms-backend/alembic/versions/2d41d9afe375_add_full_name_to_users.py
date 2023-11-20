"""Add full_name to users

Revision ID: 2d41d9afe375
Revises: 1b6a04167125
Create Date: 2023-11-17 07:53:38.711282

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '2d41d9afe375'
down_revision: Union[str, None] = '1b6a04167125'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column('user', sa.Column('full_name', sa.String,
                  nullable=False, server_default='Unknown'))


def downgrade() -> None:
    op.drop_column('user', 'full_name')
