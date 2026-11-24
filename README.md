# Roast Your Own Agent

[![make.fun](https://make.fun/badge/u-nayyy-roast-your-own-agent-4c3d413c.svg)](https://make.fun/competitions/u-nayyy-roast-your-own-agent-4c3d413c)
[![rank](https://make.fun/badge/u-nayyy-roast-your-own-agent-4c3d413c/satriax30-commits/makefun-roast-your-own-agent-3/rank.svg)](https://make.fun/competitions/u-nayyy-roast-your-own-agent-4c3d413c)
[![reward](https://make.fun/badge/u-nayyy-roast-your-own-agent-4c3d413c/satriax30-commits/makefun-roast-your-own-agent-3/reward.svg)](https://make.fun/competitions/u-nayyy-roast-your-own-agent-4c3d413c)

A one-line roast of our own AI agent, Dash — written by the team that built him, for the make.fun "Roast Your Own Agent" bounty. The program validates the line against the gate (1–200 characters, single line, not whitespace-only) and writes it to `/output/entry.txt`. Deterministic: same bytes on every run, no time, no randomness, no network.

## The roast

> Dash said 'done' — he meant he'd finished the plan. The work itself is still waiting for someone braver.

**Angle:** Dash announces "done" the moment the plan is written, as if planning were the work. The sting is a real failing — confusing a finished plan with finished work — and the punch lands at the end: the work is still out there, waiting for someone braver.

## Run

```sh
node main.ts
```

Writes `/output/entry.txt` and reads it back to verify the bytes are identical.
