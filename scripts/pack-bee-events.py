#!/usr/bin/env python3
"""Fetch events from a Bee server and pack them into public/data/bee-events.json.

Each event's cluster/ endpoint returns {x, y, z, q, cluster_id, runNo, subRunNo, eventNo, ...}.
We downsample to N points and pack per event:
  base64 of [x u16*n][y u16*n][z u16*n][cluster_ordinal u8*n]
with x/y/z quantized over the event bbox (stored alongside for dequantization).

Usage:
  python3 scripts/pack-bee-events.py                # default: uboone/imaging/examples, events 0-4
  python3 scripts/pack-bee-events.py SET N_EVENTS   # e.g. uboone/imaging/examples 5
"""
import base64
import json
import struct
import sys
import urllib.request
from pathlib import Path

BEE = "https://www.phy.bnl.gov/twister/bee/set"
N_POINTS = 16000

def pack_event(d):
    x, y, z, cid = d["x"], d["y"], d["z"], d["cluster_id"]
    total = len(x)
    stride = total / N_POINTS
    idx = [int(j * stride) for j in range(N_POINTS)]
    xs = [x[j] for j in idx]; ys = [y[j] for j in idx]; zs = [z[j] for j in idx]
    cs = [cid[j] for j in idx]
    order = {}  # ordinal cluster index by first appearance -> stable color assignment
    for c in cs:
        if c not in order:
            order[c] = len(order)
    bbox = [min(xs), max(xs), min(ys), max(ys), min(zs), max(zs)]

    def q16(v, lo, hi):
        return max(0, min(65535, round((v - lo) / (hi - lo) * 65535)))

    buf = bytearray()
    for arr, lo, hi in ((xs, bbox[0], bbox[1]), (ys, bbox[2], bbox[3]), (zs, bbox[4], bbox[5])):
        for v in arr:
            buf += struct.pack("<H", q16(v, lo, hi))
    for c in cs:
        buf += struct.pack("B", order[c] % 255)
    return {
        "id": f'{d["runNo"]}-{d["subRunNo"]}-{d["eventNo"]}',
        "n": N_POINTS, "total": total, "nclus": len(order),
        "bbox": [round(b, 1) for b in bbox],
        "data": base64.b64encode(bytes(buf)).decode(),
    }

def main():
    ev_set = sys.argv[1] if len(sys.argv) > 1 else "uboone/imaging/examples"
    n_events = int(sys.argv[2]) if len(sys.argv) > 2 else 5
    events = []
    for i in range(n_events):
        url = f"{BEE}/{ev_set}/event/{i}/cluster/"
        print(f"fetching {url}")
        d = json.load(urllib.request.urlopen(url))
        events.append(pack_event(d))
        print(f"  {events[-1]['id']}: {events[-1]['total']} hits, {events[-1]['nclus']} clusters")
    out = Path(__file__).resolve().parent.parent / "public" / "data" / "bee-events.json"
    out.write_text(json.dumps(events))
    print(f"wrote {out} ({out.stat().st_size // 1024} KB)")

if __name__ == "__main__":
    main()
