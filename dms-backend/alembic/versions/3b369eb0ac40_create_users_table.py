"""Create users table

Revision ID: 3b369eb0ac40
Revises:
Create Date: 2023-12-03 19:38:17.977990

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '3b369eb0ac40'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'users',
        sa.Column('id', sa.Integer, primary_key=True, index=True),
        sa.Column('email', sa.String(), nullable=False, unique=True, index=True),
        sa.Column('username', sa.String(), nullable=False, unique=True, index=True),
        sa.Column('password', sa.String(), nullable=False),
        sa.Column('is_superuser', sa.Boolean(), server_default='FALSE'),
        sa.Column('is_active', sa.Boolean(), server_default='TRUE'),
        sa.Column('full_name', sa.String(), nullable=False),
    )


def downgrade() -> None:
    op.drop_table('users')
