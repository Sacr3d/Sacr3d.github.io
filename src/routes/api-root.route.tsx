import React from "react";
import { useLocation } from "react-router-dom";
import APIRootComponent from "../components/APIRootComponent";


type APIRootState = {
	api_root?: string
};

export default function APIRoot() {


	let apiRootState: APIRootState = {
		api_root: undefined
	}


	const location = useLocation()

	if (location.state) {
		const { state } = location;
		apiRootState.api_root = (state as Record<string, string>).api_root
	}
	return (
		<>
			<header className="bg-white shadow">
				<div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
					<h1 className="text-3xl font-bold text-gray-900">API Root</h1>
				</div>
			</header>
			<main>
				<div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
					{/* Replace with your content */}
					<APIRootComponent apiRoot={apiRootState.api_root} />
					{/* /End replace */}
				</div>
			</main>
		</>
	)


}