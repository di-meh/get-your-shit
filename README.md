# Get Your Shit

## Membres du projet

- Nikola PANIC
- Mehdi SABER

## Installation

```bash
cp .env.example .env
```

```bash
docker compose build --pull --no-cache
```

### Dev environment

```bash
docker compose up -d
```

### Prod environment

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```
