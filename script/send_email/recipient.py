class Recipient(object):
    def __init__(self, name, email, lang):
        self.name = name
        self.email = email
        self.lang = lang

    def __repr__(self):
        return 'name: %s, email: %s, lang: %s' %(self.name, self.email, self.lang)