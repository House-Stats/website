<script lang="ts">
    import { page } from '$app/stores';
    $: current_page = $page.url.pathname;
    let suggestions: Array<Array<[string,string]>> = [];

    let isFocused = false;
    const onFocus =()=> isFocused=true;
    const onBlur = () => setTimeout(() => { isFocused=false; }, 250);

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
  

<nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-900">
    <div class="container flex flex-wrap items-center justify-between mx-auto">
    <a href="/" class="flex items-center">
        <img src="/logo.svg" class="h-15 mr-3 sm:h-9" alt="House Stats Logo" />
        <span class="self-center text-xl font-light whitespace-nowrap dark:text-white">House Stats</span>
    </a>
    <div class="md:order-2">
        <button type="button" data-collapse-toggle="navbar-search" aria-controls="navbar-search" aria-expanded="false" class="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1" >
            <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
            <span class="sr-only">Search</span>
        </button>
        <div class="relative hidden md:block flex">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg class="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                <span class="sr-only">Search icon</span>
            </div>
            <input 
                type="text" 
                id="search-navbar"
                autocomplete="off"
                class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                placeholder="Search Areas..."
                on:input={e => autoComplete(e.target.value)}
                on:focus={onFocus}
                on:blur={onBlur}>
            <div class="absolute">
                {#if isFocused == true}
                    <div class="relative block bg-white -mt-1 w-52 p-2">
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
        <button data-collapse-toggle="navbar-search" type="button" class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-search" aria-expanded="false">
            <span class="sr-only">Open menu</span>
            <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
        </button>
    </div>
        <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 relative" id="navbar-search">
        <div class="relative mt-3 md:hidden">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg class="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
            </div>
            <input 
                type="text" 
                id="search-navbar"
                autocomplete="off"
                class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                placeholder="Search Areas..."
                on:input={e => autoComplete(e.target.value)}
                on:focus={onFocus}
                on:blur={onBlur}>
            <div class="absolute">
                {#if isFocused == true}
                <div class="relative bg-white  w-96">
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
        <ul class="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
                <a
                    href="/" 
                    class="block py-2 pl-3 pr-4 rounded {current_page === "/" ?  'text-white bg-blue-700 md:bg-transparent md:text-blue-700 md:p-0 dark:text-white' : 'text-gray-700 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'}"
                >Dashboard</a>
            </li>
            <li>
                <a
                href="/counties" 
                class="block py-2 pl-3 pr-4 rounded {current_page === "/counties" ?  'text-white bg-blue-700 md:bg-transparent md:text-blue-700 md:p-0 dark:text-white' : 'text-gray-700 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'}"
                >Overview Counties</a>
            </li>
            <li>
                <a
                href="/valuation" 
                class="block py-2 pl-3 pr-4 rounded {current_page === "/valuation" ?  'text-white bg-blue-700 md:bg-transparent md:text-blue-700 md:p-0 dark:text-white' : 'text-gray-700 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'}"
                >House Valuation</a>
            </li>
            <li>
                <a
                href="/reports" 
                class="block py-2 pl-3 pr-4 rounded {current_page === "/reports" ?  'text-white bg-blue-700 md:bg-transparent md:text-blue-700 md:p-0 dark:text-white' : 'text-gray-700 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'}"
                >Report Generator</a>
            </li>
        </ul>
        </div>
    </div>
</nav>
  