
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
 
export const load = (async ({ params, fetch }) => {
    let postcode: string = params.postcode;
    let paon: string = params.paon;
    let saon: string = params.saon;
	const response = await fetch('https://api.housestats.co.uk/api/v1/find/' + postcode.toUpperCase() + '/' + paon.toUpperCase() + '/' + saon.toUpperCase());
	const data = await response.json();
	if (response.status == 200) {
		return data
	} else {
		throw error(404, 'No Postcode Found');
	}
  }) satisfies PageLoad;