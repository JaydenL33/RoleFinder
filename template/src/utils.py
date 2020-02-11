from .models import User

def isLegitLogin(user, password):
    namecheck = User.query.filter_by(username=user).first()

    if namecheck is None:
        return False

    if namecheck.pw == password:
        return True

    return False

     