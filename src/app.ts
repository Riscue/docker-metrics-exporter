import express, {Express} from 'express';
import {dockerContainers, dockerContainerStats} from "../dockerstats";
import Mustache from "mustache";
import {Metrics} from "./metrics";
import {Config} from "./config";
import * as fsP from "fs/promises";
import * as fs from "fs";

if (!fs.existsSync("/var/run/docker.sock")) {
    console.log("/var/run/docker.sock file does not exist!");
    process.exit(1);
}

const app: Express = express();

app.get('/', async (req, res) => res.redirect("/metrics"));

app.get('/metrics', async (req, res) => {
    const dockerContainersData = await dockerContainers();
    const dockerContainerStatsData = await dockerContainerStats();
    const containersData = dockerContainersData.map(t1 => ({...t1, ...dockerContainerStatsData.find(t2 => t2.id === t1.id)}));

    const metricList = [];

    for (const metric of Metrics.Metrics) {
        const metrics = [];

        for (const containerData of containersData) {
            const value = metric.value(containerData);
            if (value) {
                metrics.push({
                    labels: metric.labels.map(label => {
                        return {
                            name: label.name,
                            value: label.value(containerData)
                        }
                    }),
                    value: value,
                    timestamp: new Date().getTime()
                });
            }
        }

        metricList.push({
            name: metric.name,
            help: metric.help,
            type: metric.type,
            metrics: metrics
        });
    }

    const template = await fsP.readFile('template.mustache', {encoding: 'utf8'});
    res.setHeader("Content-Type", "text/plain");
    res.send(Mustache.render(template, {metrics: metricList}));
});

app.listen(Config.PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${Config.PORT}`);
});
