from django.dispatch import Signal

# instance: the User who follows
# target_user: the User who is being followed
follow_user_signal = Signal(providing_args=['instance', 'target_user'])

# instance: the User who follows
# target_user: the User who is being unfollowed
unfollow_user_signal = Signal(providing_args=['instance', 'target_user'])
