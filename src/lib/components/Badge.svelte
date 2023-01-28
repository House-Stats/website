<script lang="ts">
    export let text: string;
    export let colour: string;
    export let size: string = "xs";
    export let classes: string;
</script>

<span class="bg-{colour}-100 text-{colour}-800 text-{size} font-medium m-1 px-2.5 py-0.5 rounded {classes}">{text}</span>
