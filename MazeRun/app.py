from flask import Flask, request, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('tests.html')

if __name__ == "__main__":
    app.debug = True
    app.run() 