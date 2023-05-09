
<script lang='ts'>
    export let filter: string;
    let suggestions: Array<Array<[string,string]>> = [];

    let isFocused = false;
    const onFocus = ()=> isFocused = true;
    const onBlur = () => setTimeout(() => { isFocused=false; }, 250);

    let results: boolean = false;

    async function autoComplete(search_value: string){
        if (search_value) {
            const response = await fetch('https://api.housestats.co.uk/api/v1/search/' + search_value + '?filter=' + filter);
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
    function titleCase(str: string) {
        return str.toLowerCase().split(' ').map(function(word: string) {
            return (word.charAt(0).toUpperCase() + word.slice(1));
        }).join(' ');
    }
</script>




<div class="flex flex-col">
    <input type="text" 
    name="area" 
    class="p-3 rounded" 
    autocomplete="off"
    placeholder={"Search " + titleCase(filter)}
    on:input={e => autoComplete(e.target.value)}
    on:focus={onFocus}
    on:blur={onBlur}>
    {#if isFocused == true}
        <div class="bg-white absolute mt-12 w-52 block">
            {#if results == true}
                {#each suggestions as suggestion}
                    <a href={'/valuation/' + suggestion[0]} class="pl-2 hover:bg-gray-300 block">
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