# Agent instructions

## Project

**fluently** — gamified language learning for West African languages (see `README.md`). The repository is currently a greenfield stub: there is no application source, package manifests, Docker config, or test/lint tooling yet.

## Cursor Cloud specific instructions

### Repository state

- **Runnable services:** none are defined in the repo yet (no `package.json`, `docker-compose`, backend/frontend directories, or run scripts).
- **Lint / test / build:** not applicable until a stack and scripts are added.
- **Package manager / runtime:** not pinned in-repo. The Cloud VM provides Node.js (via nvm), npm, pnpm, yarn, Python 3.12, and git.

### When application code lands

1. Add the usual manifests and lockfiles for your chosen stack (e.g. `package.json` + lockfile, or `pyproject.toml`).
2. Document install, dev server, lint, and test commands in `README.md`.
3. Extend the VM **update script** (via Cursor environment setup) to run only dependency refresh on startup — e.g. `pnpm install` or `pip install -r requirements.txt` — not dev servers or migrations.
4. List **required** vs **optional** services here (ports, env vars, local DB/API) so future agents can start the right processes without guessing.

### Useful commands today

| Goal | Command |
|------|---------|
| Confirm repo | `git status` |
| Read product intent | `cat README.md` |

### Gotchas

- Do not assume Node, Python, or Docker versions from this repo until version files (`.nvmrc`, `.python-version`, etc.) are committed.
- End-to-end or UI demos are impossible until a client/API exists; agents should scope work to docs, scaffolding, or infrastructure only when the tree is still empty.
