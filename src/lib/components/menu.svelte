<script lang="ts">
    import { page } from '$app/stores';
    import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Button, Input } from 'flowbite-svelte'

    $: current_page = $page.url.pathname;
    let suggestions: Array<Array<[string,string]>> = [];

    let isFocused = false;
    const onSearchFocus =()=> isFocused=true;
    const onSearchBlur = () => setTimeout(() => { isFocused=false; }, 250);

    let results: boolean = false;

    async function autoComplete(search_value: string){
        if (search_value) {
            const response = await fetch('https://api.housestats.co.uk/api/v1/search/' + search_value);
            const data = await response.json();
            if (data.found == true){
                suggestions = data.results;
                results = true;
            } else {
                results = false;
            }
        } else {
            results = false;
        }
    }
</script>

<Navbar let:toggle let:hidden>
    <NavBrand href="/">
        <img src="/logo.svg" class="h-15 mr-3 sm:h-9" alt="House Stats Logo" />
        <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            House Stats
        </span>
    </NavBrand>
    <div class="flex md:order-2">
        <Button color="none" data-collapse-toggle="mobile-menu-3" aria-controls="mobile-menu-3" aria-expanded="false" class="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1" >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 dark:text-white"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
        </Button>
        <div class="hidden relative md:block">
            <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 dark:text-white"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
            </div>
            <input 
                type="text" 
                id="search-navbar"
                autocomplete="off"
                class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                placeholder="Search Areas..."
                on:input={e => autoComplete(e.target.value)}
                on:focus={onSearchFocus}
                on:blur={onSearchBlur}>
            <div class="absolute">
                {#if isFocused == true}
                    <div class="relative bg-white w-96">
                        {#if results == true}
                            {#each suggestions as suggestion}
                                <a href="/analyse/{suggestion[1]}/{suggestion[0]}" class="pl-2 hover:bg-gray-300 block">
                                    {suggestion[0]}
                                    <span class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">{suggestion[1]}</span>
                                </a>
                            {/each}
                        {:else}
                            <p class="ml-2">No Results</p>
                        {/if}
                    </div>
                {/if}
            </div>
        </div>
        <NavHamburger on:click={toggle} />
    </div>
    <NavUl {hidden}>
        <NavLi href="/" active={current_page === "/" ?  true : false}>Dashboard</NavLi>
        <NavLi href="/counties" active={current_page === "/counties" ?  true : false}>Overview Counties</NavLi>
        <NavLi href="/valuation" active={current_page === "/valuation" ?  true : false}>House Valuation</NavLi>
        <NavLi href="/reports" active={current_page === "/reports" ?  true : false}>Report Generator</NavLi>
    </NavUl>
</Navbar>
