"""Add ticket_id in comments:


Revision ID: 1d6a89923a55
Revises: c957e7509199
Create Date: 2024-01-28 00:46:48.845979

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '1d6a89923a55'
down_revision: Union[str, None] = 'c957e7509199'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column('comments', sa.Column(
        'ticket_id', sa.Integer, nullable=True))


def downgrade() -> None:
    op.drop_column('comments', 'ticket_id')
