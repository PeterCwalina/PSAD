# Team Phil Swift's Amazing Doors
# SoftDev pd7

from flask import Flask, request, render_template, session, redirect, flash
import util.accounts
import util.sessions
import base64

app = Flask(__name__)
app.secret_key = util.accounts.get_salt()

@app.route('/')
def index():
    util.sessions.clear_ret_path(session)
    if util.accounts.is_logged_in(session):
        return render_template(
            'index.html',  # For logged in users
            logged_in=util.accounts.get_logged_in_user(session)
        )
    else:
        return render_template(
            'index.html',  # For logged out users
            logged_in=None
        )


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        if util.accounts.is_logged_in(session):
            return redirect('/')
        else:
            return render_template('login.html')

    # Get values passed via POST
    username = request.form.get('username')
    password = request.form.get('password')

    ret_path = util.sessions.use_ret_path(session)
    if ret_path is None:
        ret_path = '/'

    if util.accounts.auth_user(username, password):
        util.accounts.login_user(session, username)
        return redirect(ret_path)
    else:
        flash('Bad username or password')
        return render_template('login.html')


@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'GET':
        if util.accounts.is_logged_in(session):
            return redirect('/')
        else:
            return render_template('signup.html')

    # Get values passed via POST
    username = request.form.get('username')
    password = request.form.get('password')
    confirm = request.form.get('confirm')

    if util.accounts.user_exists(username):
        flash('Username already taken')
        return render_template('signup.html')
    elif password != confirm:
        flash('Passwords do not match')
        return render_template('signup.html')
    else:
        if util.accounts.valid_password(password):
            password_error = ''
        else:
            password_error = 'Please enter a password ' \
                '8 or more characters in length.'

        if util.accounts.valid_username(username):
            username_error = ''
        else:
            username_error = \
                'Username must be between 1 - 32 characters. ' \
                'Only letters, numbers, ' \
                'hyphens (-), and underscores (_) are allowed.'

        account_created = util.accounts.add_user(username, password)
        if not account_created:  # Account not created properly
            return render_template(
                'signup.html',
                password_error=password_error,
                username_error=username_error
            )
        util.accounts.login_user(session, username)
        ret_path = util.sessions.use_ret_path(session)
        if ret_path is None:
            return redirect('/')
        else:
            return redirect(ret_path)


@app.route('/logout')
def logout():
    util.sessions.clear_ret_path(session)
    util.accounts.logout_user(session)
    return redirect('/')


if __name__ == '__main__':
    util.accounts.create_table()
    app.debug = True  # Set to `False` before release
    app.run()

