from rest_framework.exceptions import APIException
from rest_framework import status


class AlreadyLogin(APIException):
    status_code = status.HTTP_404_NOT_FOUND
    default_detail = 'Already login.'
    default_code = 'not_found'
