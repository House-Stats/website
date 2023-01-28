<script lang="ts">
    /** @type {import('./$types').PageData} */
    import Badge from '$lib/components/Badge.svelte';
    import QuickStat from '$lib/components/QuickStat.svelte';
    import PieChart from '$lib/components/PieChart.svelte';
    import LineGraph from '$lib/components/LineGraph.svelte';

    let quick_stats, stats, results;
    let last_updated: Date;
    let current_month: Date;

    export let data;
    if (data.done == true) {
        quick_stats = data.results.data.quick_stats;
        stats = data.results.data;
        results = data.results;
        last_updated = new Date(results.last_updated);
        current_month = new Date(quick_stats.current_month);
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
            <p class="inline-block text-2xl m-2 align-middle">{toTitleCase(results.area)} ({toTitleCase(results.area_type)})</p>
            <Badge 
                text="Last Updated {last_updated.toLocaleDateString()}" 
                colour="green" 
                classes="inline-block align-middle"
            />
            <Badge 
                text="Execution Time {Number((results.exec_time).toFixed(3))}s" 
                colour="green" 
                classes="inline-block align-middle"
            />
            <Badge 
                text="Data Fetch Time {Number((results.load_time).toFixed(3))}s" 
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
    <div class="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 h-full m-2">
        <QuickStat 
            value={quick_stats.average_price}
            using_percentage={true}
            percentage={quick_stats.average_change}
            title="Average House Price"
            colour="red"
        />
        <QuickStat 
            value={quick_stats.current_sales_volume}
            currency={false}
            using_percentage={true}
            percentage={quick_stats.sales_volume_change}
            title="Sales Volume"
            colour="purple"
        />
        <QuickStat 
            value={quick_stats.current_price_volume}
            using_percentage={true}
            percentage={quick_stats.price_volume_change}
            title="Sales Price Volume"
            colour="green"
        />
        <QuickStat 
            value={quick_stats.expensive_sale}
            using_percentage={false}
            title="Most Expensive House"
            colour="pink"
        />
        <div class="xl:row-span-2">
            <PieChart title="Property Types" labels={stats.type_proportions.type} data={stats.type_proportions.count}/>
        </div>
        <div class="md:col-span-2 row-span-2">
            <LineGraph title="Monthly Average Price" labels={stats.average_price.type} data={stats.average_price.prices} dates={stats.average_price.dates}/>
        </div>
        <div class="bg-gray-700 md:col-span-2 row-span-2">
            Monthly Percentage Change
        </div>
        <div class=" md:col-span-2 row-span-2">
            <LineGraph title="Sales Volume" labels={stats.monthly_sales_volume.type} data={stats.monthly_sales_volume.volume} dates={stats.monthly_sales_volume.dates}/>
        </div>
        <div class="md:col-span-2 row-span-2">
            <LineGraph title="Price Volume" labels={stats.monthly_price_volume.type} data={stats.monthly_price_volume.volume} dates={stats.monthly_price_volume.dates}/>
        </div>
    </div>
</div>
