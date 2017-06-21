import pyrebase
from dateutil.parser import parse
from rfr import FusionModel
from flask import Flask, request, render_template, jsonify

config = {
    "apiKey": "AIzaSyBE8Um5qj7oJOO78bikayl-3ZV8lHvl4N4",
    "authDomain": "androidsensor-5a2ad.firebaseapp.com",
    "databaseURL": "https://androidsensor-5a2ad.firebaseio.com",
    "storageBucket": "androidsensor-5a2ad.appspot.com"
}


firebase = pyrebase.initialize_app(config)
db = firebase.database()
model = FusionModel()
data = db.child('Data').get().val()
start_time = "8 Mar 2017 04:54:46 GMT"


def get_feature(data):
    def get_data(d):
        return [d['X'], d['Y'], d['Z']]
    ret = []
    ret.extend(get_data(data['Acc']))
    ret.extend(get_data(data['Gyr']))
    ret.extend(get_data(data['Mag']))
    return ret

def get_label(cur_data, prev_loc):
    return [(cur_data['Lon'] - prev_loc['Lon']) * 1e5, (cur_data['Lat'] - prev_loc['Lat']) * 1e5]

def main():
    test_time = parse("8 Mar 2017 04:59:32 GMT")
    end_time = parse("8 Mar 2017 05:00:06 GMT")
    ret = model.test_timestamp(data, start_time, test_time, end_time)
    print(ret)
    # db.child('Predict').set(upload)


app = Flask(__name__, static_url_path='')

@app.route('/api/prediction', methods=['POST'])
def api_location():
    req = request.get_json()
    print(req)
    test_time = req['startTime']
    end_time = req['endTime']
    if test_time in data and end_time in data:
        ret = model.test_timestamp(data, start_time, test_time, end_time)
        return jsonify(ret)
    return {}

@app.route('/api/prediction/traindata', methods=['POST'])
def add_trained_data():
    req = request.get_json()
    model.save_trained_data(req)
    return jsonify({ 'success': True })


@app.route('/api/prediction/test', methods=['POST'])
def test():
    req = request.get_json()
    ret = model.test_save_data(req)
    return jsonify(ret)

@app.route('/api/prediction/reset', methods=['DELETE'])
def reset():
    model.reset()
    return jsonify({'success': True})
    

if __name__ == "__main__":
    app.run(port=3001, host='0.0.0.0', debug=True)


