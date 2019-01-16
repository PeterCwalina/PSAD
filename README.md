# PSAD
*A*hnaf Hasan, *S*hafali Gupta, *D*aniel Keriasis, *P*eter Cwalina

# Brief Summary of Project
The project will be a maze game where the maze is randomly generated along with blockers that can be removed by playing a minigame that utilizes the wikipedia api.  The minigame is to get to the bald eagle wikipedia page within 10 redirects after being started on a random wikipedia page.

# Dependencies

Runs with Python3, flask, wheel
Also uses SQLite3, which comes with Python3

# Api Keys
The wikipedia api does not require any api keys so no keys needed to run this.

# To run our project:

1. Clone this repository

```
$ git clone https://github.com/PeterCwalina/PSAD.git
```

2. Create & Activate your virtual environment

```
$ python3 -m venv tm
$ . tm/bin/activate
```

3. In your activated virtual environment, run the following commands to install the Dependencies

```
(tm) $ pip3 install -r requirements.txt

```

4. Go to the folder

```
(tm) $ cd PSAD/
```

5. Run app.py

```
(tm) $ python app.py
```

6. Navigate to `localhost:5000` on your web browser
