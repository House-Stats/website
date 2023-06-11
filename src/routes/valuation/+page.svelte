<script lang='ts'>
	import SearchBar from '$lib/components/SearchBar.svelte';
</script>
<svelte:head>
	<meta name="description" content="Effortlessly find and gather detailed information on houses with our powerful house lookup tool.">
	<title>House Stats | House Lookup</title>
</svelte:head>
<div class="flex justify-center items-center max-w-screen">
	<div class="-mt-28">
		<p class="text-3xl">Enter Postcode Below</p>
		<SearchBar filter="postcode"/>
	</div>
</div>

