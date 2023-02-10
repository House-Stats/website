<script lang='ts'>
    import type { PageData } from './$types'

    function toTitleCase(str: string) {
        return str.toLowerCase().split(' ').map(function (word) {
            return (word.charAt(0).toUpperCase() + word.slice(1));
        }).join(' ');
    }
    export let data: PageData;


    let sales = data.sales;
    let paon = data.paon;
    let saon = data.saon;
    let postcode = data.postcode;
    let formatter = Intl.NumberFormat('en', 
        { 
            notation: 'compact', 
            unitDisplay: 'long',
            style: 'currency', 
            currency: 'GBP' 
        });
</script>

<!-- 
0: "91D45F76-4675-4545-99C4-FA925BD041B5"
1: 60000
2: "Fri, 24 Oct 1997 00:00:00 GMT"
3: false
4: true
5: "A"
6: "22CH2 1LG"
 -->

<div class="mx-6 rounded p-4">
    <p class="text-2xl my-4 mx-2">{toTitleCase(saon) + (saon != '' ? ',' : '')}{toTitleCase(paon)}, {toTitleCase(data.street)}</p>
    <div class="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 h-full">
        <div class="row-span-2 bg-white p-4 rounded">
            <p class="text-lg">House Infomation</p>
            <div class="border-2 p-2">
                <p class="font-bold">Address</p>
                <p class="">
                    {saon} {paon}, <br>
                    {data.street}, <br>
                    {data.town}, <br>
                    {postcode}
                </p>
            </div>
            <div class="border-2 p-2">
                <p class="font-bold">EPC Certificate</p>
                <p>Floor Area - {data.epc_cert.sqr_m} M<sup>2</sup></p>
                <p>Energy Rating - {data.epc_cert.energy_rating}/100</p>
                <p><a class="text-blue-600" target="_blank" href={"https://find-energy-certificate.service.gov.uk" + data.epc_cert.cert_id}>View Certificate</a></p>
            </div>
        </div>
        <div class="row-span-2 md:col-span-2 bg-white p-4 rounded">
            <p class="text-lg ml-2">Previous Sales</p>
            <div class="relative overflow-x-auto">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Date
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Sales Type
                            </th>
                            <th scope="col" class="px-6 py-3">
                                PPD Category
                            </th>
                            <th scope="col" class="px-6 py-3">
                                New Build
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each sales as sale}
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {formatter.format(sale[1])}
                                </th>
                                <td class="px-6 py-4">
                                    {(new Date(sale[2])).toLocaleDateString()}
                                </td>
                                <th class="px-6 py-4">
                                    {sale[4] == true ? "Freehold" : "Leasehold"}
                                </th>
                                <th class="px-6 py-4">
                                    {sale[5] == "A" ? "Standard Price Paid" : "Additional Price Paid"}
                                </th>
                                <th class="px-6 py-4">
                                    {sale[3] ==  true ? "True" : "False"}
                                </th>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        </div>
        <div class="bg-white p-4 rounded">
            <p class="texl-lg">Valuation Coming Soon</p>
        </div>
    </div>
</div>
