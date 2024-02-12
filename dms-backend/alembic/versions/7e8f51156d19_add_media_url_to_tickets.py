"""Add media_url to tickets

Revision ID: 7e8f51156d19
Revises: 1d6a89923a55
Create Date: 2024-02-11 03:24:21.692020

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '7e8f51156d19'
down_revision: Union[str, None] = '1d6a89923a55'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column('tickets', sa.Column(
        'media_url', sa.String(), nullable=True))


def downgrade() -> None:
    op.drop_column('tickets', 'media_url')
