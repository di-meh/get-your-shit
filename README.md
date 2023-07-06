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

## Prod

### Terraform

```bash
cd infra/azure
cp terraform.tfvars.example terraform.tfvars
terraform init
terraform plan
terraform apply
```

### Kubernetes

```bash
cd infra/k8s
cp .env.prod.example .env.prod
```

Remplissez les valeurs nécessaires.

