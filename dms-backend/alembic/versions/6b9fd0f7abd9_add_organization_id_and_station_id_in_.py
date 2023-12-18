"""Add organization_id and station_id in users

Revision ID: 6b9fd0f7abd9
Revises: 131c2210e59d
Create Date: 2023-12-15 04:30:30.933429

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '6b9fd0f7abd9'
down_revision: Union[str, None] = '131c2210e59d'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column('users', sa.Column(
        'organization_id', sa.Integer(), sa.ForeignKey('organizations.id'), nullable=True))
    op.add_column('users', sa.Column(
        'station_id', sa.Integer(), sa.ForeignKey('stations.id'), nullable=True))


def downgrade() -> None:
    op.drop_column('users', 'organization_id')
    op.drop_column('users', 'station_id')
