import json

with open("../../data/episodes.json", "r") as f:
    data = json.load(f)["episodes"]

e = []
for d in data:
    dd = {}
    dd["season"] = d["season"]
    dd["view"] = d["viewers"]
    dd["len"] = d["runtime"]
    dd["title"] = d["title"]
    e.append(dd)

print(json.dumps(e))
