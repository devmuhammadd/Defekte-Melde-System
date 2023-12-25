"""Add is_deleted in tickets

Revision ID: 02beaa044ece
Revises: 70e835c828a7
Create Date: 2023-12-24 23:47:09.798583

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '02beaa044ece'
down_revision: Union[str, None] = '70e835c828a7'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column('tickets', sa.Column('is_deleted', sa.Boolean(),
                  nullable=False, server_default=sa.sql.expression.false()))


def downgrade() -> None:
    op.drop_column('tickets', 'is_deleted')
