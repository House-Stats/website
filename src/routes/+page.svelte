<script lang='ts'>
	import QuickStat from "$lib/components/QuickStat.svelte";
	import Badge from "$lib/components/Badge.svelte";
	import PieChart from "$lib/components/PieChart.svelte";
	import LineGraph from "$lib/components/LineGraph.svelte";
	import BarChart from "$lib/components/BarChart.svelte";

	export let data;
    console.log(data);
	let quick_stats = data.quick_stats;
	let current_month = new Date(data.average_price.dates.slice(-1)[0] );
	let last_updated = new Date(data.last_updated);
	let timings = data.timings;

	function toTitleCase(str: string) {
        return str.toLowerCase().split(' ').map(function (word) {
            return (word.charAt(0).toUpperCase() + word.slice(1));
        }).join(' ');
    }

    let perc_change = {
        type: ["D","F","S","T","all"],
        perc: [data.percentage_change.S.perc_change,data.percentage_change.F.perc_change,data.percentage_change.T.perc_change,data.percentage_change.D.perc_change,data.percentage_change.all.perc_change],
        date: data.percentage_change.all.date
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
                                    {Number((town["3_month_perc"]).toFixed(3))}%
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
                                    {Number((town["3_month_perc"]).toFixed(3))}%
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
		</div>
        <div class="xl:row-span-2">
            <PieChart title="Property Types" labels={data.type_proportions.type} data={data.type_proportions.count}/>
        </div>
        <div class="md:col-span-2 row-span-2">
            <LineGraph title="Monthly Average Price" labels={data.average_price.type} data={data.average_price.prices} dates={data.average_price.dates}/>
        </div>
        <div class=" md:col-span-2 row-span-2">
            <BarChart title="Percentage Change" labels={perc_change.type} data={perc_change.perc} dates={perc_change.date}/>
        </div>
        <div class=" md:col-span-2 row-span-2">
            <BarChart title="Sales Volume" labels={data.monthly_qty.type} data={data.monthly_qty.qty} dates={data.monthly_qty.dates}/>
        </div>
        <div class="md:col-span-2 row-span-2">
            <BarChart title="Price Volume" labels={data.monthly_volume.type} data={data.monthly_volume.volume} dates={data.monthly_volume.dates}/>
        </div>
    </div>
</div>