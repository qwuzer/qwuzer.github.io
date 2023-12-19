# app.py (Flask server)
from flask import Flask, request, render_template
import requests

app = Flask(__name__)

@app.route('/') 
def formPage():
    return render_template('form.html')

@app.route("/submit", methods=['POST'])
def submit():
    if request.method == 'POST':
        form_data = request.form
        new_data = {
            "chinese": form_data['chinese'],
            "english": form_data['english'],
            "matha": form_data['matha'],
            "mathb": form_data['mathb'],
            "science": form_data['science'],
            "social": form_data['social'],
            "year": form_data['year'] 
        }
        params = {}
        url = "http://localhost:3000/datas";
        result = requests.post(url, params=params, json=new_data)
        print(result.status_code)
        print(result.content)
        # if result.status_code == 200:
        #     return render_template('form.html', confirm="Upload succesfully :)")  # Display success message
        # else:
        #     return render_template('form.html', confirm="Upload failed :(")  # Display failure message
        confirm_message = f"Upload successfully :)！"
        return render_template('form.html', confirm=confirm_message)


if __name__ == "__main__":
    app.run()
