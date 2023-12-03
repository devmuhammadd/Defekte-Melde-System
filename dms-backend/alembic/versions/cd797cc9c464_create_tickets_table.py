"""Create tickets table

Revision ID: cd797cc9c464
Revises: 3b369eb0ac40
Create Date: 2023-12-03 19:46:51.158830

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'cd797cc9c464'
down_revision: Union[str, None] = '3b369eb0ac40'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'tickets',
        sa.Column('id', sa.Integer, primary_key=True, index=True),
        sa.Column('title', sa.String(), nullable=True),
        sa.Column('description', sa.String(), nullable=True),
        sa.Column('status', sa.String(), nullable=True),
        sa.Column('urgency', sa.String(), nullable=True),
        sa.Column('location', sa.String(), nullable=True),
        sa.Column('contact', sa.String(), nullable=True),
        sa.Column('location_id', sa.Integer(), nullable=False),
        sa.Column('user_id', sa.Integer(), sa.ForeignKey('users.id'), nullable=False),
        sa.Column('reporter_id', sa.Integer(), sa.ForeignKey('users.id'), nullable=False),
    )

    op.create_index(op.f('ix_tickets_user_id'), 'tickets', ['user_id'], unique=False)
    op.create_index(op.f('ix_tickets_reporter_id'), 'tickets', ['reporter_id'], unique=False)


def downgrade() -> None:
    op.drop_index(op.f('ix_tickets_reporter_id'), table_name='tickets')
    op.drop_index(op.f('ix_tickets_user_id'), table_name='tickets')
    op.drop_table('tickets')
