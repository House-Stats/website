
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
 
export const load = (async ({ params, fetch }) => {
	const response = await fetch('https://api.housestats.co.uk/api/v1/overview');
	const data = await response.json();
	if (response.status == 200) {
		return data
	} else {
		error(400, 'Unable to load main dashboard new data is being added');
	}
  }) satisfies PageLoad;