import React from "react";
import { ObjectsAPI } from "../../apis/Objects.api";
import ErrorModal, { ErrorDto } from "../ErrorModalComponent";


type StatusDto = {
	id: number,
	status: string,
	request_timestamp?: Date,
	total_count: number,
	success_count: number,
	successes?: object[],
	failure_count: number,
	failures?: object[],
	pending_count: number,
	pendings?: object[]
}

type ObjectsPostState = {
	collectionId?: string
	apiRoot?: string
	objects: object[]
	show: boolean;
	error: ErrorDto;
	statusDto?: StatusDto;
}

export default class ObjectsPostComponent extends React.Component<any> {

	public state: ObjectsPostState = {
		collectionId: undefined,
		apiRoot: undefined,
		objects: [],
		show: false,
		error: {
			title: '',
			description: '',
			http_status: 0,
			details: {}
		},
		statusDto: undefined

	}
	multilineTextarea?: React.LegacyRef<HTMLTextAreaElement>;

	hideModal = () => {
		this.setState({ show: false });
	};


	componentDidMount() {
		this.multilineTextarea = React.createRef();
		this.setState({
			apiRoot: this.props.apiRoot,
			collectionId: this.props.collectionId
		})
	}

	getObjects = () => {
		return this.state
	}

	onFormSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();

		const { navigation } = this.props;

		const target = e.target as typeof e.target & {
			'api-root': { value: string },
			'collectionId': { value: string }
		};

		const data = e.target as typeof e.target & {
			'objects': { value: string },
		};

		const apiRootInput = target['api-root'].value;
		const collectionId = target['collectionId'].value;

		const body = {
			objects: JSON.parse(data['objects'].value)
		}

		console.log(body);

		ObjectsAPI.postByCollectionId(apiRootInput, collectionId, body)
			.then(
				(response) => {

					const statusDto: StatusDto = response.data;

					this.setState({
						statusDto: statusDto
					})

					navigation('../status', { state: { statusDto: this.getObjects().statusDto, apiRoot: this.getObjects().apiRoot } })
				}
			).catch((err) => {
				this.setState({
					objects: [{ message: err }],
				})
				if (err.response) {
					this.setState({ show: true, error: err.response.data })
				}
			});
	}

	changeTextarea = (ta: HTMLTextAreaElement) => {
		ta.style.height = 'auto';
		ta.style.height = ta?.scrollHeight + 'px';
	}


	render() {
		return (<>
			<ErrorModal show={this.getObjects().show} handleClose={this.hideModal} >
				{this.getObjects().error}
			</ErrorModal>
			<form onSubmit={this.onFormSubmit} className="mb-16">
				<label htmlFor="price" className="block font-medium text-gray-700">
					api-root
				</label>
				<div className="mt-1 relative rounded-md shadow-sm mb-8">
					<input
						type="text"
						name="api-root"
						id="api-root"
						className="h-16 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 text-sm sm:text-lg border-gray-300 rounded-md"
						placeholder="api-root"
						defaultValue={this.getObjects().apiRoot}
					/>
				</div>
				<label htmlFor="price" className="block font-medium text-gray-700">
					collectionId
				</label>
				<div className="mt-1 relative rounded-md shadow-sm mb-8">
					<input
						type="text"
						name="collectionId"
						id="collectionId"
						className="h-16 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 text-sm sm:text-lg border-gray-300 rounded-md"
						placeholder="collectionId"
						defaultValue={this.getObjects().collectionId}
					/>
				</div>
				<div>
					<label htmlFor="about" className="block text-sm font-medium text-gray-700">
						Objects
					</label>
					<div className="mt-1 relative rounded-md shadow-sm mb-8">
						<textarea
							id="objects"
							name="objects"
							onChange={(e) => this.changeTextarea(e.target)}
							ref={this.multilineTextarea || undefined}
							className="h-16 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 text-sm sm:text-lg border-gray-300 rounded-md"
							placeholder={JSON.stringify(
								[
									{ id: '...' },
									{ id: '...' }
								]
								, null, 2)}
						/>
					</div>
					<p className="mt-2 text-sm text-gray-500">
						All objects must be contained in: []
					</p>
				</div>
				<div className="inset-y-0 right-0 flex items-center justify-end">
					<button
						type="submit"
						className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						Submit
					</button>
				</div>
			</form>
		</>
		)

	}


	private constructTitle(): React.ReactNode {

		if (!this.getObjects().apiRoot) {
			return ''
		}

		if (this.getObjects().apiRoot?.match(new RegExp(/\/+$/))) {
			return (this.getObjects().apiRoot as string) + (this.getObjects().collectionId as string)
		}

		return (this.getObjects().apiRoot as string) + '/' + (this.getObjects().collectionId as string)
	}
}