<script lang='ts'>
	import QuickStat from "$lib/components/QuickStat.svelte";
	import Badge from "$lib/components/Badge.svelte";
	import PieChart from "$lib/components/PieChart.svelte";
	import LineGraph from "$lib/components/LineGraph.svelte";
	import BarChart from "$lib/components/BarChart.svelte";
    import TimePeriodRadio from "$lib/components/TimePeriodRadio.svelte";
	
    export let data;
    let period = "1mo";

    $: quick_stats = data[period].quick_stats;
	$: current_month = new Date(data["1mo"].average_price.dates.slice(-1)[0] );
	$: last_updated = new Date(data.last_updated);
	$: timings = data.timings;

    $: perc_change = {
        type: ["D","F","S","T","all"],
        perc: [data[period].percentage_change.S.perc_change,data[period].percentage_change.F.perc_change,data[period].percentage_change.T.perc_change,data[period].percentage_change.D.perc_change,data[period].percentage_change.all.perc_change],
        date: data[period].percentage_change.all.date
    };
</script>
<svelte:head>
	<title>House Stats | Home</title>
</svelte:head>

<div class="h-5/6">
    <div class="m-2">
        <div class="items-center align-middle flex flex-initial flex-wrap">
            <p class="inline-block text-2xl m-2 align-middle">England & Wales, {current_month.toLocaleString('default', { month: 'long' })} {current_month.getFullYear()}</p>
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
            title="Price Volume"
            colour="green"
        />
        <QuickStat 
            value={quick_stats.expensive_sale}
            using_percentage={false}
            title="Most Expensive House"
            colour="pink"
        />
        {#key period}
		<div class="row-span-2 md:col-span-2 bg-white p-4 rounded">
            <p class="text-lg ml-2">Top 5 Areas</p>
            <div class="relative overflow-x-auto">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Postcode Areas
                            </th>
                            <th scope="col" class="px-6 py-3">
                                3m Moving Average Percentage
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each data.top_five as town}
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <a href={"/analyse/area/" + town._id.split("AREA")[0]}>{town._id.split("AREA")[0].toUpperCase()}</a>
                                </th>
                                <td class="px-6 py-4">
                                    {Number((town["3_month_perc"][0]).toFixed(3))}%
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
		</div>
		<div class="row-span-2 md:col-span-2 bg-white p-4 rounded">
            <p class="text-lg ml-2">Bottom 5 Areas</p>
            <div class="relative overflow-x-auto">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Postcode Areas
                            </th>
                            <th scope="col" class="px-6 py-3">
                                3m Moving Average Percentage
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each data.bottom_five as town}
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <a href={"/analyse/area/" + town._id.split("AREA")[0]}>{town._id.split("AREA")[0].toUpperCase()}</a>
                                </th>
                                <td class="px-6 py-4">
                                    {Number((town["3_month_perc"][0]).toFixed(3))}%
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
		</div>
        <div class="xl:row-span-2 bg-white p-4">
            <PieChart title="Property Types" labels={data[period].type_proportions.type} data={data[period].type_proportions.count}/>
        </div>
        <div class="md:col-span-2 row-span-2 bg-white p-4">
            <LineGraph title="Monthly Average Price" labels={data[period].average_price.type} data={data[period].average_price.prices} dates={data[period].average_price.dates}/>
        </div>
        <div class="md:col-span-1 row-span-2 bg-white p-4 rounded">
            <p class="text-2xl">Average Tenancy Duration</p>
            <br>
            <ul>
                <hr>
                <li><span class="text-lg font-medium">All</span> - {(Math.round((data[period].average_tenancy.all / 31536000) * 100) / 100)} Years</li>
                <hr>
                <li><span class="text-lg font-medium">Semi Detatched</span> - {(Math.round((data[period].average_tenancy.S / 31536000) * 100) / 100)} Years</li>
                <hr>
                <li><span class="text-lg font-medium">Flat</span> - {(Math.round((data[period].average_tenancy.F / 31536000) * 100) / 100)} Years</li>
                <hr>
                <li><span class="text-lg font-medium">Terrace</span> - {(Math.round((data[period].average_tenancy.T / 31536000) * 100) / 100)} Years</li>
                <hr>
                <li><span class="text-lg font-medium">Detatched</span> - {(Math.round((data[period].average_tenancy.D / 31536000) * 100) / 100)} Years</li>
                <hr>
            </ul>
        </div>
        <div class=" md:col-span-2 row-span-2 bg-white p-4">
            <BarChart title="Percentage Change" stacked={false} labels={perc_change.type} data={perc_change.perc} dates={perc_change.date}/>
        </div>
        <div class=" md:col-span-2 row-span-2 bg-white p-4">
            <BarChart title="Sales Volume" labels={data[period].monthly_qty.type.slice(0,-1)} data={data[period].monthly_qty.qty.slice(0,-1)} dates={data[period].monthly_qty.dates}/>
        </div>
        <div class="md:col-span-2 row-span-2 bg-white p-4">
            <BarChart title="Price Volume" labels={data[period].monthly_volume.type.slice(0,-1)} data={data[period].monthly_volume.volume.slice(0,-1)} dates={data[period].monthly_volume.dates}/>
        </div>
        {/key}
    </div>
</div>