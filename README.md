# Simple Lead Manager

In order to get the backend running you need to create the file "/slebackend/slebackend/secrets/secret_key.txt" and add any secret key to it. For testing purposes you can set it to any word or even just a single character if you are trying to see how it works. But don't publish the backend anywhere without changing it to a complex secret key.

You can run a simple python script to generate a secret key:

```import secrets

secret_key = secrets.token_urlsafe(64)
print(secret_key)```