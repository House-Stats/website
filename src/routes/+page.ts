
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
 
export const load = (async ({ params, fetch }) => {
	const response = await fetch('https://api.housestats.co.uk/api/v1/overview');
	const data = await response.json();
	if (response.status == 200) {
		console.log(data)
		return data
	} else {
		throw error(404, 'No Postcode Found');
	}
  }) satisfies PageLoad;