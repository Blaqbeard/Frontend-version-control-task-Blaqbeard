# Task 4 – Version Control & Git

This task demonstrates practical Git/GitHub workflows using the minimal CLI app in `story-print/`.

## What I practiced

- Creating repo and first commit
- Branching, renaming branches, and merging with `--no-ff`
- Rebasing a feature branch
- Creating and resolving an intentional merge conflict
- Reverting a merge (`git revert -m 1`)
- Cherry-picking a commit from another branch
- Squash workflow via interactive rebase before merge
- Tagging releases and generating activity logs

## Evidence

- Log: `story-print/TASK4_LOG.txt`
- App entry: `story-print/index.js`
- Tags: `v0.1` … `v0.7`

## How to run

```bash
cd story-print
node index.js           # Chapter 0
$env:CHAPTER=6; node index.js   # PowerShell example
```

## Notes

- Each chapter corresponds to a branch-based exercise as described in the root README.

### Pull Requests

- (to be filled with URLs)

### Clone I used

```bash
git clone https://github.com/Blaqbeard/story-print.git
cd story-print
```

### Fetch/Pull Evidence

- Ran on master: `git fetch --all --prune` and `git pull --rebase` (captured in `TASK4_LOG.txt`).
