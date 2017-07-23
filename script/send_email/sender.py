class Sender(object):
    def __init__(self, name, user, pwd):
        self.name = name
        self.user = user
        self.pwd = pwd

    def __repr__(self):
        return 'name: %s, user: %s, pwd: %s' % (self.name, self.user, self.pwd)
