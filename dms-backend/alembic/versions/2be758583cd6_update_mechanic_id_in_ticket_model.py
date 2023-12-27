"""Update mechanic_id in Ticket model

Revision ID: 2be758583cd6
Revises: 02beaa044ece
Create Date: 2023-12-27 02:51:02.122847

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '2be758583cd6'
down_revision: Union[str, None] = '02beaa044ece'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.drop_column('tickets', 'reporter_id')
    op.add_column('tickets', sa.Column('mechanic_id', sa.Integer(),
                  sa.ForeignKey('users.id'), nullable=False))


def downgrade() -> None:
    op.drop_column('tickets', 'mechanic_id')
    op.add_column('tickets', sa.Column('reporter_id', sa.Integer(),
                  sa.ForeignKey('users.id'), nullable=False))
