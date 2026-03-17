from fastapi import FastAPI
import mysql.connector

app = FastAPI()

# link the data
# Please replace "yourpassword" with your own MySQL password before running the backend.
def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="yourpassword",
        database="expense_tracker"
    )

# get all transactions
@app.get("/transactions")
def get_transactions():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM transactions")
    transactions = cursor.fetchall()

    cursor.close()
    conn.close()

    return transactions
