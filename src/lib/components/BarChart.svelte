<script lang="ts">
    import Chart from 'chart.js/auto';
    import zoomPlugin from 'chartjs-plugin-zoom';
    import { onMount } from 'svelte';
    import 'chartjs-adapter-date-fns';
    import {enGB} from 'date-fns/locale';

    Chart.register(zoomPlugin);
    let graph_id = Math.random().toString(36).substr(2, 5)

    let house_types: { [key: string]: string }  = {
        'D': "Detatched",
        'S': "Semi-Detatched",
        'T': "Terrace",
        'F': "Flat",
        'O': 'Other',
        "all": "All"
    };
    let colours = [
        '#dc2626',
        '#9333ea',
        '#16a34a',
        '#db2777'
    ]

    export let labels: Array<string>;
    export let title: string;
    export let data: Array<Array<BigInt>>;
    export let dates: Array<string>;

        let data_length = data.length;
    let datasets = [];
    for (let i = 0; i < data_length; i++){
        datasets.push({
            label: house_types[labels[i]],
            data: data[i],
            tension: 0.1,
            backgroundColor: colours[i],
            fill: false,
        });
    }
    const chart_data = {
        labels: dates.map((x) => {return new Date(x)}),
        datasets: datasets
    };
    const config = {
        responsive: true,
        type: 'bar',
        data: chart_data,
        options: {
            scales: {
                x: {
                    stacked: true,
                    type: 'time',
                    time: {
                        round: 'month',
                        minUnit: 'month'
                    },
                    adapters: {
                        date: {
                            locale: enGB
                        }
                    }
                },
                y: {
                    stacked: true
                }
            },
            plugins: {
                zoom: {
                    pan: {
                        enabled: true
                    },
                    zoom: {
                    wheel: {
                        enabled: true,
                    },
                    pinch: {
                        enabled: true
                    },
                    mode: 'xy',
                    }
                },
                title: {
                    display: true,
                    text: title
                }
            }
        }
    };
    let line_chart: Chart;
    onMount(()=> {
        let ctx = document.getElementById(graph_id);
        if (ctx != null){
            line_chart = new Chart(ctx, config);
        }
    })
</script>

<canvas id={graph_id}>
</canvas>
<button on:click={line_chart.resetZoom('default')} type="button" class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Reset Zoom</button>

