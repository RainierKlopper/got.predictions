import json
import collections

cou = collections.Counter()


with open("../../data/episodes.json", "r") as f:
    data = json.load(f)["episodes"]

e = []
for d in data:
    a = [b.strip() for b in d["directed_by"].split(",")]
    e += a

p = collections.Counter(e)

c = 0
cl = []
for key, value in p.items():
    cl.append({'name': key, 'episodes': value, 'id': c})
    c += 1

print(json.dumps(cl))
