<script lang="ts">
    import Chart from 'chart.js/auto';
    import { onMount } from 'svelte';

    let house_types: { [key: string]: string }  = {
        'D': "Detatched",
        'S': "Semi-Detatched",
        'T': "Terrace",
        'F': "Flat",
        'O': 'Other'
    };

    export let labels: Array<string>;
    export let title: string;
    export let data: Array<BigInteger>;

    const chart_data = {
        labels: labels.map((x) => {return house_types[x]}),
        datasets: [{
            label: title,
            data: data,
            backgroundColor: [
            '#dc2626',
            '#9333ea',
            '#16a34a',
            '#db2777'
            ],
            hoverOffset: 4
        }],
    };
    const config = {
        type: 'pie',
        data: chart_data,
        options: {
            plugins: {
                title: {
                    display: true,
                    text: title
                }
            }
        }
    };
    onMount(()=> {
        let ctx = document.getElementById('piechart');
        new Chart(ctx, config);
    })
</script>

<canvas id="piechart">

</canvas>