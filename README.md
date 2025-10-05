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

## Image Reference

![Repo overview](/images/repo-overview.png)
![Git history](/images/git-history.png)
[![Merged PR](/images/merged-pr.png)](https://github.com/Blaqbeard/story-print/pull/2)

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

- https://github.com/Blaqbeard/story-print/pull/2
- https://github.com/Blaqbeard/story-print/pull/3
- https://github.com/Blaqbeard/story-print/pull/4

### Clone I used

```bash
git clone https://github.com/Blaqbeard/story-print.git
cd story-print
```

### Fetch/Pull Evidence

- Ran on master: `git fetch --all --prune` and `git pull --rebase` (captured in `TASK4_LOG.txt`).

Header: add project clear tagline.

Note: header verified locally.

Footer: copyright � 2025 line.

Docs: add resource links

Docs: add license notice

Docs: fix small typo

Chore: minor visual tweak

Chore: add version note

Chore: add summary footer

### Pull Requests

- https://github.com/Blaqbeard/Frontend-version-control-task-Blaqbeard/pull/8
- https://github.com/Blaqbeard/Frontend-version-control-task-Blaqbeard/pull/7
- https://github.com/Blaqbeard/Frontend-version-control-task-Blaqbeard/pull/6

### Commands I used most

- git branch / checkout / switch
- git add / commit / push / pull --rebase / fetch --all --prune
- git merge / rebase -i / cherry-pick / revert
- gh pr create / comment / merge

### Lessons learned

- Clear commit messages and small PRs simplify reviews.
- Squash keeps history clean; rebase integrates linear history.
- Revert is safer than reset on shared branches.
