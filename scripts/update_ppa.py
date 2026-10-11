import json, re, urllib.request, datetime, pathlib
url="https://ppatour.com.au/tournaments/ppa-1500-australia/"
req=urllib.request.Request(url,headers={"User-Agent":"Mozilla/5.0 BRISSY-guide/1.0"})
try:
    with urllib.request.urlopen(req,timeout=20) as res:
        html=res.read().decode("utf-8","replace")
except Exception as exc:
    print("Official source unavailable:",exc)
    raise SystemExit(0)
text=re.sub(r"<[^>]+>"," ",html)
text=re.sub(r"\s+"," ",text)
if not ("13" in text and "18" in text and "Queensland Tennis Centre" in text):
    print("Unexpected page content; leaving schedule unchanged")
    raise SystemExit(0)
path=pathlib.Path("ppa-schedule.json")
data=json.loads(path.read_text())
data["checkedAt"]=datetime.datetime.now(datetime.timezone.utc).isoformat()
data["notice"]="Official event page checked. Event runs 13–18 October at Queensland Tennis Centre. The page describes the day-by-day stages but does not provide a verified match-by-match order of play. Check the tournament draws for match times."
path.write_text(json.dumps(data,indent=2)+"\n")
print("Official event overview checked.")
