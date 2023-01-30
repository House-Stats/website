
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
 
export const load = (async ({ params }) => {
  let postcode: string = params.postcode;
	const response = await fetch('https://api.housestats.co.uk/api/v1/find/' + postcode.toUpperCase());
	const data = await response.json();
	if (response.status == 200) {
		return {
			data: data.results,
			postcode: postcode
		}
	} else {
		throw error(404, 'No Postcode Found');
	}
  }) satisfies PageLoad;