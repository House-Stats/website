<script lang='ts'>
  	import type { PageData } from './$types';

  	export let data: PageData;
</script>

<div class="md:mx-24 my-8">
	<a href="/valuation" class=" bg-white p-2 rounded text-blue-600">&lt; Back</a>
	<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
		<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
			<caption class="p-5 text-xl font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
				{data.postcode.toUpperCase()}
				<p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">All of the houses with the postcode {data.postcode.toUpperCase()}.</p>
			</caption>
			<thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
				<tr>
					<th scope="col" class="px-6 py-3"> SAON, PAON </th>
					<th scope="col" class="px-6 py-3"> Street </th>
					<th scope="col" class="px-6 py-3"> Town </th>
					<th scope="col" class="px-6 py-3"> County </th>
					<th scope="col" class="px-6 py-3"> Postcode </th>
					<th scope="col" class="px-6 py-3"> Action </th>
				</tr>
			</thead>
			<tbody>
				{#each data.data as house}
					<tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
						<th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
							{house[2]}{house[1] != '' && house[2] != '' ? ',' : ''} {house[1]}
						</th>
						<td class="px-6 py-4">
							{house[4]}
						</td>
						<td class="px-6 py-4">
							{house[5]}
						</td>
						<td class="px-6 py-4">
							{house[6]}
						</td>
						<td class="px-6 py-4">
							{house[3]}
						</td>
						<td class="px-6 py-4">
							<a href="/valuation/{data.postcode.toUpperCase()}/{house[1]}/{house[2]}" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</a>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
