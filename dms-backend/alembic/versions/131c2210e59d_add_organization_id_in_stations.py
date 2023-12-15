"""Add organization_id in stations

Revision ID: 131c2210e59d
Revises: 223db432223e
Create Date: 2023-12-15 04:30:13.964962

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '131c2210e59d'
down_revision: Union[str, None] = '223db432223e'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column('stations', sa.Column(
        'organization_id', sa.Integer(), sa.ForeignKey('organizations.id'), nullable=True))


def downgrade() -> None:
    op.drop_column('stations', 'organization_id')
