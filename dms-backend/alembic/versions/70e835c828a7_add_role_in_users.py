"""Add role in users

Revision ID: 70e835c828a7
Revises: 6b9fd0f7abd9
Create Date: 2023-12-15 20:29:34.881856

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '70e835c828a7'
down_revision: Union[str, None] = '6b9fd0f7abd9'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column('users', sa.Column('role', sa.String(), nullable=True))


def downgrade() -> None:
    op.drop_column('users', 'role')
