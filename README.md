# Simple Lead Manager

The first step to get the backend running you need to create the file "/slebackend/slebackend/secrets/secret_key.txt" and add any secret key to it. For testing purposes you can set it to any word or even just a single character if you are trying to see how it works. But don't publish the backend anywhere without changing it to a complex secret key.

Then in order to create your own local database you need to run the script below from Simple-Lead-Manager/slebackend
```
python manage.py slebackend makemigrations
python manage.py migrate
```

You can run a simple python script to generate a secret key:

```python
import secrets

secret_key = secrets.token_urlsafe(64)
print(secret_key)
```

from Simple-Lead-Manager/slefrontend , the frontend will run with
```
npm run args
```

from Simple-Lead-Manager/slebackend , the backend will run with
```
python manage.py runserver
```
