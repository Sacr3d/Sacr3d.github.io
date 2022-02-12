import { Dialog, Transition } from '@headlessui/react';
import { ExclamationIcon } from '@heroicons/react/outline';
import React, { Fragment, useRef, useState } from 'react';

export type ErrorDto = {
	title: string,
	description: string,
	http_status: number,
	details: Record<string, unknown>
}

interface IModal {
	show: boolean;
	handleClose?: React.MouseEventHandler<HTMLButtonElement>;
	children?: ErrorDto
}

export default function ErrorModal({ show, handleClose, children }: IModal) {

	const [open, setOpen] = useState(false)

	const cancelButtonRef = useRef(null)
	return (
		<Transition.Root.Root show={show} as={Fragment}>
			<Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={setOpen}>
				<div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
					</Transition.Child>

					<span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
						&#8203;
					</span>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						enterTo="opacity-100 translate-y-0 sm:scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 translate-y-0 sm:scale-100"
						leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
					>
						<div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-screen-xl sm:w-full">
							<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
								<div className="sm:flex sm:items-start">
									<div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
										<ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
									</div>
									<div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
										<Dialog.Title as="h3" className="text-xl leading-6 font-medium text-gray-900">
											Error
										</Dialog.Title>
										<div className="mt-2">
											<p className="text-md text-gray-500">

												<div className="bg-white shadow overflow-hidden sm:rounded-lg">
													<div className="px-4 py-5 sm:px-6">
														<h3 className="text-lg leading-6 font-medium text-gray-900">api-root</h3>
													</div>
													<div className="border-t border-gray-200">
														<dl>
															<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
																<dt className="text-sm font-medium text-gray-500">title</dt>
																<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
																	{
																		children?.title
																	}
																</dd>
															</div>
															<div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
																<dt className="text-sm font-medium text-gray-500">description</dt>
																<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
																	{
																		children?.description

																	}
																</dd>
															</div>
															<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
																<dt className="text-sm font-medium text-gray-500">http_status</dt>
																<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
																	{
																		children?.http_status
																	}
																</dd>
															</div>
															<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
																<dt className="text-sm font-medium text-gray-500">detail</dt>
																<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
																	<ul className="p-1 border border-gray-200 rounded-md divide-y divide-gray-200">
																		{
																			JSON.stringify(children?.details, null, 2)
																		}
																	</ul>
																</dd>
															</div>

														</dl>
													</div >
												</div >


											</p>
										</div>
									</div>
								</div>
							</div>
							<div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
								<button
									type="button"
									className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
									onClick={handleClose}
									ref={cancelButtonRef}
								>
									Close
								</button>
							</div>
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition.Root.Root>
	);
};