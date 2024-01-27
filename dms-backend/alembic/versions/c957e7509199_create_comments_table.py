"""Create comments table

Revision ID: c957e7509199
Revises: a7d8c6d50411
Create Date: 2024-01-28 00:42:20.120030

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'c957e7509199'
down_revision: Union[str, None] = 'a7d8c6d50411'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'comments',
        sa.Column('id', sa.Integer, primary_key=True, index=True),
        sa.Column('message', sa.String),
        sa.Column('created_at', sa.DateTime),
        sa.Column('user_id', sa.Integer, sa.ForeignKey(
            'users.id'), nullable=False)
    )


def downgrade() -> None:
    op.drop_table('comments')
