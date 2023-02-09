
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
	const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
  	let area: string = params.area;
  	let area_type: string = params.area_type;
	
	let stats;
	let counter = 0
	const response = await fetch('https://api.housestats.co.uk/api/v1/analyse/' + area_type + '/' + area);
	const data = await response.json();
	if (data.status == "ok") {
		while (true) {
			const res_resp = await fetch(data.result);
            stats = await res_resp.json();
            if (stats.status == "SUCCESS" || stats.status == "COMPLETED") {
				break
			} else if (counter > 60*4) {
				throw error(500, 'Connection Timed Out')
			}
			counter++;
			await sleep(250)
		}
	} else {
		throw error(500, 'An Error Has Occured');
	}
	return stats
}