import urllib, json, os, random# Standard Library

from flask import Flask, render_template, request, url_for,flash,session,redirect # Related third-party


app = Flask(__name__)


@app.route('/')
def home():
    return render_template('home.html')


#for the wikipedia find the bald eagle in 5 redirects game
@app.route('/wiki/<id>/<tries>')
def wiki(id,tries):
    if (int(id) < 0):#in case theres an id that shouldnt be there
        return redirect('/wiki/10000/'+ tries)

    else:
        if (id == '4401'):#if you wind up at the id for bald eagle go back home
            return redirect(url_for('home'))

    Tries = int(tries) - 1
    if (Tries == 0):#if you run out of tries you lose
        return "You Lose"
    wikipedia = "https://en.wikipedia.org/w/api.php"
    query = str(wikipedia) + "?action=query&format=json&prop=info&pageids=" + str(id) + "&generator=links&gpllimit=max"
    u = urllib.request.urlopen(query)#make a request for all the links on the page of this id
    response = u.read()
    data = json.loads(response)
    data = data['query']['pages']

    return render_template('wiki.html',
                            dict = data,
                            title = "Get to the bald Eagle",
                            tries = str(Tries))

@app.route('/StartWiki')
def StartWiki():
    #just so that it starts at a specified point
    page = random.randint(10000,20000)
    return redirect('/wiki/' + str(page) + '/10')




if __name__ == "__main__":
    app.debug = True
    app.run()
