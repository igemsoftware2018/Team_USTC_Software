"""
This module includes some signals defined to handle different events happening in the forums.
"""

from django.dispatch import Signal

# rating_score: The score other user rated.
# curr_score: The score after that user rated.
# user_rating: The person (User instance) who rated.
# instance: the instance which send this signal
rating_brick_signal = Signal(providing_args=('rating_score', 'curr_score',
                                             'user_rating', 'instance'))

# instance: the instance sending this signal.
# user_up_voting: the user who vote for the post
# curr_up_vote_num: the number of votes after this voting.
voted_experience_signal = Signal(
    providing_args=('instance', 'user_voted', 'current_votes')
)
unvoted_experience_signal = Signal(
    providing_args=('instance', 'user_unvoted')
)

watching_brick_signal = Signal(providing_args=('instance', 'user'))
unwatching_brick_signal = Signal(providing_args=('instance', 'user'))
