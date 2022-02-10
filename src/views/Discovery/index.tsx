import DiscoveryComponent from "../../components/DiscoveryComponent";
import Header from "../../components/HeaderComponent";

export default function DiscoveryView() {
	return (
		<>
			<Header
				title="SL TAXII Discovery"
			/>
			<main>
				<div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
					<DiscoveryComponent />
				</div>
			</main>
		</>
	)
}