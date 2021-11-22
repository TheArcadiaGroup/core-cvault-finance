export const routes = {
	loanStats: '/api/loanStats',
	providers: '/api/providers',
	positionsSummary: '/api/summary'
} as const;
export const responseMap = {
	[routes.loanStats]: {
		interestPerYear: 0,
		liquidationThreshold: 0
	},
	[routes.providers]: {
		providers: ['metamask', 'walletconnect', 'coinbase']
	},
	[routes.positionsSummary]: {
		collateralValue: 0,
		daiBorrowed: 0,
		leftToBorrow: 0,
		interestAccured: 0
	}
} as const;
async function _fetchService(input: RequestInfo, options?: any) {
	// mock fetch for now
	let url: string;
	if (input instanceof Request) {
		url = input.url;
	} else {
		url = input;
	}
	const mockedResponse = responseMap[url];
	// simulate wait?
	// await new Promise((r) => setTimeout(r, 10000 * Math.random()));
	return new Response(
		mockedResponse ? JSON.stringify(mockedResponse) : JSON.stringify({ error: 'Not found' }),
		{
			status: mockedResponse ? 200 : 404,
			headers: { 'content-type': 'application/json' }
		}
	);
}

export const fetchService: typeof fetch = _fetchService;
