import smtplib


class EmailSender(object):
    def __init__(self, sender, recipient, subject, body):
        self.sender = sender
        self.recipient = recipient
        self.subject = subject
        self.body = body.replace('{name}', recipient.name)
        self.message = self.message = """From: %s\r\nTo: %s\r\nSubject: %s\r\n\r\n%s
        """ % (self.sender.name, self.recipient.email, self.subject, self.body)

    def send(self):
        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.ehlo()
        server.starttls()
        server.login(self.sender.user, self.sender.pwd)
        server.sendmail(self.sender.name, [self.recipient.email], self.message.encode('utf-8'))
        server.close()
        print('successfully sent mail to %s: %s' % (self.recipient.name, self.recipient.email))
