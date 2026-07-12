from flask import Flask, render_template, request, redirect, url_for, session
from database import *
from ai import generate_roadmap

app = Flask(__name__)
app.secret_key = "career_roadmap_secret"


# ==========================
# HOME
# ==========================

@app.route("/")
def home():
    return render_template("index.html")


# ==========================
# REGISTER
# ==========================

@app.route("/register", methods=["GET", "POST"])
def register():

    if request.method == "POST":

        # Matches register.html
        name = request.form["fullname"]
        email = request.form["email"]
        password = request.form["password"]

        try:
            register_user(name, email, password)
            return redirect(url_for("login"))

        except:
            return "Email already exists."

    return render_template("register.html")


# ==========================
# LOGIN
# ==========================

@app.route("/login", methods=["GET", "POST"])
def login():

    if request.method == "POST":

        email = request.form["email"]
        password = request.form["password"]

        user = login_user(email, password)

        if user:

            session["email"] = email
            session["name"] = user[1]

            return redirect(url_for("form"))

        return "Invalid Email or Password."

    return render_template("login.html")


# ==========================
# FORM
# ==========================

@app.route("/form")
def form():

    if "email" not in session:
        return redirect(url_for("login"))

    return render_template("form.html")


# ==========================
# GENERATE ROADMAP
# ==========================

@app.route("/generate_roadmap", methods=["POST"])
def generate_roadmap_route():

    if "email" not in session:
        return redirect(url_for("login"))

    name = request.form["name"]
    career = request.form["career"]
    skills = request.form["skills"]
    interests = request.form["interests"]
    education = request.form["education"]
    time = request.form["time"]

    roadmap = generate_roadmap(
        name,
        education,
        skills,
        interests,
        career
    )

    save_roadmap(
        session["email"],
        career,
        roadmap
    )

    return render_template(
        "roadmap.html",
        name=name,
        career=career,
        education=education,
        skills=skills,
        interests=interests,
        time=time,
        roadmap=roadmap
    )


# ==========================
# DASHBOARD
# ==========================

@app.route("/dashboard")
def dashboard():

    if "email" not in session:
        return redirect(url_for("login"))

    data = get_roadmap(session["email"])

    if data:
        career_goal = data[0]
        roadmap = data[1]
    else:
        career_goal = "No Roadmap Yet"
        roadmap = "Generate your first roadmap."

    return render_template(
        "dashboard.html",
        name=session["name"],
        career_goal=career_goal,
        roadmap=roadmap
    )


# ==========================
# LOGOUT
# ==========================

@app.route("/logout")
def logout():

    session.clear()

    return redirect(url_for("home"))


# ==========================
# RUN
# ==========================

if __name__ == "__main__":
    app.run(debug=True)