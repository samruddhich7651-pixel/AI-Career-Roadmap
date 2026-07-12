import sqlite3


# ==============================
# Database Connection
# ==============================

def connect_db():
    return sqlite3.connect("database.db")


# ==============================
# Create Tables
# ==============================

def create_tables():

    conn = connect_db()
    cursor = conn.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users(

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        name TEXT NOT NULL,

        email TEXT UNIQUE NOT NULL,

        password TEXT NOT NULL
    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS roadmaps(

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        user_email TEXT,

        career_goal TEXT,

        roadmap TEXT
    )
    """)

    conn.commit()
    conn.close()


# ==============================
# Register User
# ==============================

def register_user(name, email, password):

    conn = connect_db()
    cursor = conn.cursor()

    cursor.execute(
        "INSERT INTO users(name,email,password) VALUES(?,?,?)",
        (name, email, password)
    )

    conn.commit()
    conn.close()


# ==============================
# Login User
# ==============================

def login_user(email, password):

    conn = connect_db()
    cursor = conn.cursor()

    cursor.execute(
        "SELECT * FROM users WHERE email=? AND password=?",
        (email, password)
    )

    user = cursor.fetchone()

    conn.close()

    return user


# ==============================
# Save Roadmap
# ==============================

def save_roadmap(email, goal, roadmap):

    conn = connect_db()
    cursor = conn.cursor()

    cursor.execute(
        "INSERT INTO roadmaps(user_email,career_goal,roadmap) VALUES(?,?,?)",
        (email, goal, roadmap)
    )

    conn.commit()
    conn.close()


# ==============================
# Get Latest Roadmap
# ==============================

def get_roadmap(email):

    conn = connect_db()
    cursor = conn.cursor()

    cursor.execute(
        "SELECT career_goal, roadmap FROM roadmaps WHERE user_email=? ORDER BY id DESC LIMIT 1",
        (email,)
    )

    data = cursor.fetchone()

    conn.close()

    return data


# Create database on first run
create_tables()
