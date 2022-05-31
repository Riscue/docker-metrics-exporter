type LabelDefinition = { name: string; value: (data: any) => any };
type MetricDefinition = { help: string; name: string; type: string; value: (data: any) => any; labels: LabelDefinition[] };

const getId = (data: any) => `/docker/${data.id}`;

const getName = (data: any) => data.name;

const getImage = (data: any) => data.image;

export class Metrics {
    static Metrics: MetricDefinition[] = [
        {
            name: "container_blockio_reads",
            help: "The amount of data the container has read from block devices on the host",
            type: "counter",
            labels: [
                {name: "id", value: getId},
                {name: "name", value: getName},
                {name: "image", value: getImage}],
            value: (data: any) => data.blockIO.r
        },
        {
            name: "container_blockio_writes",
            help: "The amount of data the container has written to block devices on the host",
            type: "counter",
            labels: [
                {name: "id", value: getId},
                {name: "name", value: getName},
                {name: "image", value: getImage}],
            value: (data: any) => data.blockIO.w
        },
        {
            name: "container_cpu_percent",
            help: "The percentage of the host’s CPU the container is using",
            type: "gauge",
            labels: [
                {name: "id", value: getId},
                {name: "name", value: getName},
                {name: "image", value: getImage}],
            value: (data: any) => data.cpuPercent
        },
        {
            name: "container_cpu_user_seconds_total",
            help: "Cumulative user cpu time consumed in seconds.",
            type: "counter",
            labels: [
                {name: "id", value: getId},
                {name: "name", value: getName},
                {name: "image", value: getImage}],
            value: (data: any) => data.cpuStats.cpu_usage.usage_in_usermode / Math.pow(10, 9)
        },
        {
            name: "container_last_seen",
            help: "Last time a container was seen by the exporter",
            type: "gauge",
            labels: [
                {name: "id", value: getId},
                {name: "name", value: getName},
                {name: "image", value: getImage}],
            value: () => new Date().getTime()
        },
        {
            name: "container_spec_memory_limit_bytes",
            help: "Memory limit for the container.",
            type: "gauge",
            labels: [
                {name: "id", value: getId},
                {name: "name", value: getName},
                {name: "image", value: getImage}],
            value: (data: any) => data.memLimit
        },
        {
            name: "container_memory_percent",
            help: "The percentage of the host’s memory the container is using",
            type: "gauge",
            labels: [
                {name: "id", value: getId},
                {name: "name", value: getName},
                {name: "image", value: getImage}],
            value: (data: any) => data.memPercent
        },
        {
            name: "container_memory_rss",
            help: "Size of RSS in bytes.",
            type: "gauge",
            labels: [
                {name: "id", value: getId},
                {name: "name", value: getName},
                {name: "image", value: getImage}],
            value: (data: any) => data.memoryStats.stats.rss
        },
        {
            name: "container_memory_usage_bytes",
            help: "Current memory usage in bytes, including all memory regardless of when it was accessed",
            type: "gauge",
            labels: [
                {name: "id", value: getId},
                {name: "name", value: getName},
                {name: "image", value: getImage}],
            value: (data: any) => data.memUsage
        },
        {
            name: "container_network_receive_bytes_total",
            help: "Cumulative count of bytes received",
            type: "counter",
            labels: [
                {name: "id", value: getId},
                {name: "name", value: getName},
                {name: "image", value: getImage}],
            value: (data: any) => data.netIO.rx
        },
        {
            name: "container_network_transmit_bytes_total",
            help: "Cumulative count of bytes transmitted",
            type: "counter",
            labels: [
                {name: "id", value: getId},
                {name: "name", value: getName},
                {name: "image", value: getImage}],
            value: (data: any) => data.netIO.wx
        },
        {
            name: "container_pids",
            help: "The number of processes or threads the container has created",
            type: "gauge",
            labels: [
                {name: "id", value: getId},
                {name: "name", value: getName},
                {name: "image", value: getImage}],
            value: (data: any) => data.pids
        },
        {
            name: "container_restart_count",
            help: "Represents the number of times the container inside a pod has been restarted",
            type: "counter",
            labels: [
                {name: "id", value: getId},
                {name: "name", value: getName},
                {name: "image", value: getImage}],
            value: (data: any) => data.restartCount
        },
        {
            name: "container_created",
            help: "Represents the epoch of the container is created",
            type: "gauge",
            labels: [
                {name: "id", value: getId},
                {name: "name", value: getName},
                {name: "image", value: getImage}],
            value: (data: any) => data.created
        },
        {
            name: "container_finished",
            help: "Represents the epoch of the container is finished",
            type: "gauge",
            labels: [
                {name: "id", value: getId},
                {name: "name", value: getName},
                {name: "image", value: getImage}],
            value: (data: any) => data.finished
        },
        {
            name: "container_started",
            help: "Represents the epoch of the container is started",
            type: "gauge",
            labels: [
                {name: "id", value: getId},
                {name: "name", value: getName},
                {name: "image", value: getImage}],
            value: (data: any) => data.started
        },
        {
            name: "container_state",
            help: "Container state",
            type: "gauge",
            labels: [
                {name: "id", value: getId},
                {name: "name", value: getName},
                {name: "image", value: getImage}],
            value: (data: any) => convertToNumber(data.state)
        },
    ]
}

function convertToNumber(str: string) {
    return parseInt(str, 36);
}

function convertFromNumber(num: number) {
    return (num).toString(36).toUpperCase();
}
