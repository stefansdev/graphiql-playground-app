'use client';

import { useState, useEffect } from 'react';
import GraphiQL from 'graphiql';
import Contribute from '@/components/Contribute';
import 'graphiql/graphiql.min.css';

const GraphiQLWrapper = () => {
	const [url, setUrl] = useState('');
	const [token, setToken] = useState(null);

	return (
		<>
			<div className="flex bg-blue-200 py-2 px-4 space-x-4 text-sm font-mono justify-between items-center">
				<div className="flex space-x-4">
					<div>
						<input
							type="text"
							id="url"
							placeholder="GraphQL URL"
							value={url}
							onChange={(e) => setUrl(e.target.value)}
							className="rounded-md border min-w-[300px] bg-white outline-none px-4 py-2"
						/>
					</div>
					<div>
						<input
							type="text"
							id="token"
							placeholder="Bearer token"
							value={token}
							onChange={(e) => setToken(e.target.value)}
							className="rounded-md border min-w-[300px] bg-white outline-none px-4 py-2"
						/>
					</div>
				</div>
				<Contribute />
			</div>

			<GraphiQL
				fetcher={async (graphQLParams) => {
					const data = await fetch(url, {
						method: 'POST',
						headers: {
							Accept: 'application/json',
							'Content-Type': 'application/json',
							Authorization: `Bearer ${token}`,
						},
						body: JSON.stringify(graphQLParams),
					});
					return data.json().catch(() => data.text());
				}}
			/>
		</>
	);
};
export default GraphiQLWrapper;
