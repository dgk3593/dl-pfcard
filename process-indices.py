import os
import json

subdirList = os.scandir("public/sprites")
for subdir in subdirList:
    json_path = subdir.path + '/index.json'
    with open(json_path, 'r+') as f:
        data = json.load(f)
        # data['faceList'] = data.pop('face')
        # data['mouthList'] = data.pop('mouth')

        # if len(data['parts']) == 0:
        #     newData = {"offset": {"x": 0, "y": 0},
        #                "size": {"x": 0, "y": 0},
        #                "faceList": [],
        #                "mouthList": []}
        # else:
        #     parts = data['parts'][0]
        #     offset_x = data['rect']['x'] + parts['position']['x']
        #     offset_y = data['rect']['y'] + parts['position']['y']
        #     newData = {"offset": {'x': offset_x, 'y': offset_y},
        #                "size": parts['size'],
        #                "faceList": parts['images']['0'],
        #                "mouthList": parts['images']['1']}

        json_obj = json.dumps(data)
        f.seek(0)
        f.truncate()
        f.write(json_obj)
