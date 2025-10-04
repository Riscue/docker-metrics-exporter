# 🐳 docker-metrics-exporter

Lightweight Prometheus exporter for Docker container and host metrics.

## 🚀 What is this?

**docker-metrics-exporter** is a lightweight exporter that exposes Docker container and host metrics in **Prometheus format**.

## ✨ Features

- Container-level CPU, memory, disk, and network metrics
- Host-level Docker statistics
- Easy Prometheus integration
- Simple deployment via Docker image

## 📦 Quick Start

Run from source:

```bash
git clone https://github.com/Riscue/docker-metrics-exporter.git
cd docker-metrics-exporter
npm install
npm run build
node dist/app.js
```

## ⚙️ Configuration

Available parameters:

Change in `config.ts`

## 📊 Prometheus integration

Add to your `prometheus.yml`:

```yaml
scrape_configs:
  - job_name: 'docker_metrics_exporter'
    static_configs:
      - targets: ['localhost:8080']
```
