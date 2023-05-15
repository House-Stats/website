<script lang="ts">
    /** @type {import('./$types').PageData} */
    import Badge from '$lib/components/Badge.svelte';
    import QuickStat from '$lib/components/QuickStat.svelte';
    import PieChart from '$lib/components/PieChart.svelte';
    import LineGraph from '$lib/components/LineGraph.svelte';
    import BarChart from '$lib/components/BarChart.svelte';
    import TimePeriodRadio from '$lib/components/TimePeriodRadio.svelte';

    let quick_stats, stats, results, timings, perc_change;
    let last_updated: Date;
    let current_month: Date;
    let area: string;
    let period = "6mo";

    export let data;
    $: if (data.status == "SUCCESS") {
        quick_stats = data.result.stats[period].quick_stats;
        stats = data.result.stats[period];
        results = data.result;
        timings = results.timings;
        last_updated = new Date(results.last_updated);
        current_month = new Date(quick_stats.current_month);

        perc_change = {
            type: ["S","F","T","D","all"],
            perc: [],
            date: stats.percentage_change.all.date
        };

        for (let i = 0; i < perc_change.type.length; i++){
            try {
                perc_change.perc.push(stats.percentage_change[perc_change.type[i]].perc_change)
            } catch (TypeError) {
                null
            }
        }

        
        let postcodes = ["POSTCODE","AREA","SECTOR","OUTCODE"]
        if (!postcodes.includes(results.area_type)){
            area = toTitleCase(results.area);
        } else {
            area = results.area;
        }
    }

    let title = "Analyse";
    
    function toTitleCase(str: string) {
        return str.toLowerCase().split(' ').map(function (word) {
            return (word.charAt(0).toUpperCase() + word.slice(1));
        }).join(' ');
    }
</script>


<svelte:head>
	<title>House Stats | {title}</title>
</svelte:head>


<div class="h-5/6">
    <div class="m-2">
        <div class="items-center align-middle flex flex-initial flex-wrap">
            <p class="inline-block text-2xl m-2 align-middle">{area} ({toTitleCase(results.area_type)}) {current_month.toLocaleString('default', { month: 'long' })} {current_month.getFullYear()}</p>
            <Badge 
                text="Last Updated {last_updated.toLocaleDateString()}" 
                colour="green" 
                classes="inline-block align-middle"
            />
            <Badge 
                text="Execution Time {Number((timings.aggregate).toFixed(3))}s" 
                colour="green" 
                classes="inline-block align-middle"
            />
            <Badge 
                text="Data Fetch Time {Number((timings.loader).toFixed(3))}s" 
                colour="green"
                classes="inline-block align-middle"
            />
            <Badge 
                text="Current Month {current_month.toLocaleDateString()}" 
                colour="green" 
                classes="inline-block align-middle"
            />
        </div>
    </div>
    <TimePeriodRadio bind:period={period}></TimePeriodRadio>
    <div class="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 h-full m-2">
        <QuickStat 
            value={quick_stats.average_price}
            using_percentage={true}
            percentage={quick_stats.average_change}
            title="Average House Price"
            colour="red"
        />
        <QuickStat 
            value={quick_stats.sales_qty}
            currency={false}
            using_percentage={true}
            percentage={quick_stats.sales_qty_change}
            title="Sales Volume"
            colour="purple"
        />
        <QuickStat 
            value={quick_stats.sales_volume}
            using_percentage={true}
            percentage={quick_stats.sales_volume_change}
            title="Sales Price Volume"
            colour="green"
        />
        <QuickStat 
            value={quick_stats.expensive_sale}
            using_percentage={false}
            title="Most Expensive House"
            colour="pink"
        />
        {#key period}
        <div class="xl:row-span-2  bg-white p-4">
            <PieChart title="Property Types" labels={stats.type_proportions.type} data={stats.type_proportions.count}/>
        </div>
        <div class="md:col-span-2 row-span-2  bg-white p-4">
            <LineGraph title="Monthly Average Price" labels={stats.average_price.type} data={stats.average_price.prices} dates={stats.average_price.dates}/>
        </div>
        <div class="md:col-span-1 row-span-2 bg-white p-4 rounded">
            <p class="text-2xl">Average Tenancy Duration</p>
            <br>
            <ul>
                <hr>
                <li><span class="text-lg font-medium">All</span> - {(Math.round((stats.average_tenancy.all / 31536000) * 100) / 100)} Years</li>
                <hr>
                <li><span class="text-lg font-medium">Semi Detatched</span> - {(Math.round((stats.average_tenancy.S / 31536000) * 100) / 100)} Years</li>
                <hr>
                <li><span class="text-lg font-medium">Flat</span> - {(Math.round((stats.average_tenancy.F / 31536000) * 100) / 100)} Years</li>
                <hr>
                <li><span class="text-lg font-medium">Terrace</span> - {(Math.round((stats.average_tenancy.T / 31536000) * 100) / 100)} Years</li>
                <hr>
                <li><span class="text-lg font-medium">Detatched</span> - {(Math.round((stats.average_tenancy.D / 31536000) * 100) / 100)} Years</li>
                <hr>
            </ul>
        </div>
        <div class="md:col-span-2 row-span-2  bg-white p-4">
            <BarChart title="Percentage Change" stacked={false} labels={perc_change.type} data={perc_change.perc} dates={perc_change.date}/>
        </div>
        <div class=" md:col-span-2 row-span-2  bg-white p-4">
            <BarChart title="Sales Volume" labels={stats.monthly_qty.type.slice(0,-1)} data={stats.monthly_qty.qty.slice(0,-1)} dates={stats.monthly_qty.dates}/>
        </div>
        <div class="md:col-span-2 row-span-2  bg-white p-4">
            <BarChart title="Price Volume" labels={stats.monthly_volume.type.slice(0,-1)} data={stats.monthly_volume.volume.slice(0,-1)} dates={stats.monthly_volume.dates}/>
        </div>
        {/key}
    </div>
</div>
