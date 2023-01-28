<script lang="ts">
    let formatter = Intl.NumberFormat('en', 
        { 
            notation: 'compact', 
            unitDisplay: 'long',
            style: 'currency', 
            currency: 'GBP' 
        });
    export let value: GLfloat;
    export let using_percentage: boolean = false;
    export let percentage: GLfloat = 0;
    export let title: string;
    export let currency: boolean = true;
    export let colour: string;
</script>

<div class="bg-{colour}-600 text-white rounded p-2 ">
    {#if currency}
        <p class="text-2xl font-extralight inline">{formatter.format(value)}</p>
    {:else}
        <p class="text-2xl font-extralight inline">{value.toLocaleString()}</p>
    {/if}
    {#if using_percentage }
    <p class="inline font-thin align-top">{percentage < 0 ? '▼' : '▲'} {Math.abs(percentage)}%</p>
    {/if}
    <p class="text-sm font-extralight">{title}</p>
</div>