# Team Phil Swift's Amazing Doors
# SoftDev pd7

import urllib, json, os, random  # Standard Library
from flask import Flask, request, render_template, session, redirect, \
        flash, url_for  # Flask
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
            'home.html',  # For logged in users
            logged_in=util.accounts.get_logged_in_user(session)
        )
    else:
        return render_template(
            'home.html',  # For logged out users
            logged_in=None
        )


@app.route('/maze')
def maze():
    if 'saved' in session:
        saved = True
    else:
        saved = False
    maze = session['maze'] if saved else None
    blockers = session['blockers'] if saved else None
    start = session['start'] if saved else None
    end = session['end'] if saved else None
    x = session['x'] if saved else None
    y = session['y'] if saved else None
    return render_template(
        'maze.html',
        saved=saved,
        maze=maze,
        blockers=blockers,
        start=start,
        end=end,
        x=x,
        y=y,
    )


@app.route('/win')
def win():
    del session['saved']
    del session['maze']
    del session['blockers']
    del session['start']
    del session['end']
    del session['x']
    del session['y']
    return redirect('/')


#for the wikipedia find the bald eagle in 5 redirects game
@app.route('/wiki/<id>/<tries>', methods=['GET', 'POST'])
def wiki(id,tries):
    if (int(id) < 0):#in case theres an id that shouldnt be there
        return redirect('/wiki/10000/'+ tries)
    else:
        if (id == '4401'):#if you wind up at the id for bald eagle go back home
            return redirect(url_for('maze'))
    Tries = int(tries) - 1
    if (Tries == 0):#if you run out of tries you lose
        return redirect(url_for('StartWiki'))
    wikipedia = "https://en.wikipedia.org/w/api.php"
    query = str(wikipedia) + "?action=query&format=json&prop=info&pageids=" + str(id) + "&generator=links&gpllimit=max"
    u = urllib.request.urlopen(query)#make a request for all the links on the page of this id
    response = u.read()
    data = json.loads(response)
    try:
        data = data['query']['pages']
    except Exception as e:
        return redirect(url_for('StartWiki'))

    return render_template('wiki.html',
                            dict = data,
                            title = "Get to the bald Eagle",
                            tries = str(Tries))

@app.route('/StartWiki', methods=['GET', 'POST'])
def StartWiki():
    if request.method != 'POST':
        return redirect('/')
    maze = request.form.get('maze')
    blockers = request.form.get('blockers')
    start = request.form.get('start')
    end = request.form.get('end')
    x = request.form.get('x')
    y = request.form.get('y')
    session['saved'] = True
    session['maze'] = maze
    session['blockers'] = blockers
    session['start'] = start
    session['end'] = end
    session['x'] = x
    session['y'] = y
    #just so that it starts at a specified point
    page = random.randint(10000, 20000)
    return redirect('/wiki/' + str(page) + '/10')


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

@app.route('/test')
def none():
    return render_template('tests.html')

if __name__ == '__main__':
    util.accounts.create_table()
    app.debug = True  # Set to `False` before release
    app.run()

