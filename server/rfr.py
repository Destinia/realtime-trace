from sklearn.ensemble import RandomForestRegressor
from sklearn.datasets import *
from sklearn.metrics import mean_absolute_error
from sklearn.cross_validation import train_test_split
import json
from dateutil.parser import parse

# data = json.load(open('cleaned_data.json'))
# X = [x['feature'] for x in data]
# y = [x['label'] for x in data]
# X = [[x[0]*1e5, x[1]*1e5] for x in X]
# y = [[x[0] * 1e5, x[1] * 1e5] for x in y]
# print(X)
# train_x, test_x, train_y, test_y = train_test_split(X, y, test_size=0.1)
# model = RandomForestRegressor(n_estimators=20, max_depth=4, n_jobs=-1)
# model.fit(train_x, train_y)
# print('Train MAE: {0}'.format(mean_absolute_error(train_y, model.predict(train_x))))
# print(model.predict(train_x))
# print('Test MAE: {0}'.format(mean_absolute_error(test_y, model.predict(test_x))))

class FusionModel(object):
    def __init__(self):
        self.prev_loc = None
        self.model = RandomForestRegressor(n_estimators=20, max_depth=4, n_jobs=-1)

    def get_feature(self, data):
        def get_data(d):
            return [d['X'], d['Y'], d['Z']]
        ret = []
        ret.extend(get_data(data['Acc']))
        ret.extend(get_data(data['Gyr']))
        ret.extend(get_data(data['Mag']))
        return ret

    def get_label(self, cur_data, prev_loc):
        return [(cur_data['Lon'] - prev_loc['Lon']) * 1e5, (cur_data['Lat'] - prev_loc['Lat']) * 1e5]
    def train(self, data):
        """train model
        args:
            data - {
                Lon
                Lat
                Acc: {X,Y,Z}
                Gyr: ...
                Mag: ...
            }
        """
        if not self.prev_loc:
            feature = self.get_feature(data)
            print(feature)
            label = self.get_label
            self.model.fit(feature, label)
   
        self.prev_loc = { 'Lon': data['Lon'], 'Lat': data['Lat'] }

    def test(self, data):
        feature = self.get_feature(data)
        print(feature)
        result = self.model.predict(feature)
        result = [x*1e-5 for x in result]
        self.prev_loc = {
            'Lon': self.prev_loc['Lon'] + result[0], 'Lat': self.prev_loc['Lat'] + result[1]}
        return self.prev_loc

    def test_timestamp(self, data, start, test, end):
        train_data = []
        train_label = []
        test_data = []
        prev_loc = None
        last_loc = []
        test_time_stamp = []
        start_time = parse(start)
        test_time = parse(test)
        end_time = parse(end)

        for k, v in data.items():
            cur_time = parse(k)
            if cur_time > start_time and cur_time < test_time:
                # model.train(v)
                train_data.append((self.get_feature(v)))
                train_label.append((self.get_label(v, prev_loc)))
                last_loc = [v['Lon'], v['Lat']]
            elif cur_time >= test_time and cur_time < end_time:
                test_data.append(self.get_feature(v))
                test_time_stamp.append(k)
            prev_loc = {'Lon': v['Lon'], 'Lat': v['Lat']}
        print(len(train_data), len(train_label))
        self.model.fit(train_data, train_label)
        result = self.model.predict(test_data)
        predict_loc = []
        predict_loc.append(last_loc)
        for r in result:
            predict_loc.append([r[0] * 1e-5 + predict_loc[-1][0],
                                r[1] * 1e-5 + predict_loc[-1][1]])
        ret = {}
        for i, r in enumerate(predict_loc[1:]):
            ret[test_time_stamp[i]] = {'Lon': r[0], 'Lat': r[1]}
        return ret

            
        
