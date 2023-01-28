<script>
	import Menu from "$lib/components/menu.svelte";
	import Loader from "$lib/components/Loader.svelte";
	import { navigating } from '$app/stores';
	import "../app.css";
	import "flowbite/dist/flowbite.css";

	let current_year = new Date().getFullYear();
</script>
  


<style lang="postcss">
	:global(html) {
		background-color: theme(colors.slate.200);
	}
</style>

<div class="flex flex-col min-h-screen justify-between">
	<div class="inline">
		<Menu></Menu>
	</div>
	{#if $navigating}
		<div class="flex justify-center items-center my-52">   
			<Loader></Loader>
		</div>
	{:else}
		<slot />
	{/if}
	
	<footer class="bg-green-800 text-sm text-white text-center inset-x-0 bottom-0 p-2">
	  &copy; {current_year} Morgan Thomas | <a href="mailto:contact@housestats.co.uk">contact@housestats.co.uk</a> | <a href="/tos">Terms of Use</a> | <a href="/pp">Privacy Policy</a> <br>
	  Contains HM Land Registry data © Crown copyright and database right 2021. This data is licensed under the Open Government Licence v3.0.
	</footer>
</div>
