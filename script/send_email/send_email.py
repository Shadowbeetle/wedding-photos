import yaml
from recipient import Recipient
from sender import Sender
from email_sender import EmailSender

with open('send_email/email.yaml', encoding='utf-8') as f:
    email_setup = yaml.safe_load(f)
    sender = Sender(email_setup['from'], email_setup['user'], email_setup['pwd'])


def parse_recipient(line):
    name, email_address, lang = line.strip('\n').split(';')
    return Recipient(name, email_address, lang)


with open('send_email/recipients.csv', encoding='utf-8') as f:
    recipients_strings = f.readlines()
    recipients = map(parse_recipient, recipients_strings)

for recipient in recipients:
    subject = email_setup['subject'][recipient.lang]
    body = email_setup['body'][recipient.lang]
    email = EmailSender(sender, recipient, subject, body)
    email.send()
