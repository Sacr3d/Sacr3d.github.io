import './App.css';
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, TrashIcon, XIcon } from '@heroicons/react/outline';
import {
	BrowserRouter,
	Routes,
	Route,
	NavLink,
} from "react-router-dom";
import Discovery from './routes/discovery.route';
import APIRoot from './routes/api-root.route';
import Collection from './routes/collection.route';
import Status from './routes/status.route';

import SLLogo from './logo.svg';
import { ObjectsGet, ObjectsPost } from './routes/object.route';
import { Fragment } from 'react';
import { ClearDBAPI } from './apis/ClearDB.api';
import Version from './routes/version.route';


interface CustomNavType {
	name: string,
	href: string,
	current: boolean,
	route: any
}

const navigation: CustomNavType[] = [
	{ name: 'TAXII Discovery', href: '/', current: true, route: Discovery },
	{ name: 'APIRoots', href: '/api-root', current: false, route: APIRoot },
	{ name: 'Collections', href: '/collections', current: false, route: Collection },
	{ name: 'Get Objects', href: '/objects/get', current: false, route: ObjectsGet },
	{ name: 'Post Objects', href: '/objects/post', current: false, route: ObjectsPost },
	{ name: 'Statuses', href: '/status', current: false, route: Status },
	{ name: 'Versions', href: '/version', current: false, route: Version }

]

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ')
}

const clearDB = async () => {

	ClearDBAPI.clear()
}

function App() {
	return (
		<>
			{/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}

			<BrowserRouter>
				<div className="min-h-full">
					<Disclosure as="nav" className="bg-gray-800">
						{({ open }) => (
							<>
								<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
									<div className="flex items-center justify-between h-16">
										<div className="flex items-center">
											<div className="flex-shrink-0">
												<img
													className="h-8 w-8"
													src={SLLogo}
													alt="CyberKit4SME"
												/>
											</div>
											<div className="hidden md:block">
												<div className="ml-10 flex items-baseline space-x-4">
													{navigation.map((item) => (
														<NavLink
															key={item.name}
															to={item.href}
															className={({ isActive }) =>
																isActive ? 'bg-gray-900 text-white  px-3 py-2 rounded-md text-sm font-medium' : 'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
															}

															aria-current={item.current ? 'page' : undefined}
														>
															{item.name}
														</NavLink>
													))}
												</div>
											</div>
										</div>

										<div className="hidden md:block">
											<div className="ml-4 flex items-center md:ml-6">

												{/* Profile dropdown */}
												<Menu as="div" className="ml-3 relative">
													<div>
														<Menu.Button
															className="bg-red-700 p-1 rounded-full hover:text-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
														>
															<TrashIcon className="h-6 w-6" aria-hidden="true" />
														</Menu.Button>
													</div>
													<Transition
														as={Fragment}
														enter="transition ease-out duration-100"
														enterFrom="transform opacity-0 scale-95"
														enterTo="transform opacity-100 scale-100"
														leave="transition ease-in duration-75"
														leaveFrom="transform opacity-100 scale-100"
														leaveTo="transform opacity-0 scale-95"
													>
														<Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
															{
																<Menu.Item>
																	<a
																		href='/#'
																		className='bg-gray-100 block px-4 py-2 text-sm text-gray-700'
																		onClick={() => clearDB()}
																	>
																		ClearDB
																	</a>
																</Menu.Item>
															}
														</Menu.Items>
													</Transition>
												</Menu>
											</div>
										</div>

										<div className="-mr-2 flex md:hidden">
											{/* Mobile menu button */}
											<Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
												<span className="sr-only">Open main menu</span>
												{open ? (
													<XIcon className="block h-6 w-6" aria-hidden="true" />
												) : (
													<MenuIcon className="block h-6 w-6" aria-hidden="true" />
												)}
											</Disclosure.Button>
										</div>
									</div>
								</div>

								<Disclosure.Panel className="md:hidden">
									<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
										{navigation.map((item) => (
											<NavLink

												key={item.name}
												to={item.href}
												className={classNames(
													item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
													'block px-3 py-2 rounded-md text-base font-medium'
												)}
												aria-current={item.current ? 'page' : undefined}
											>
												{item.name}
											</NavLink>
										))}
									</div>
								</Disclosure.Panel>
							</>
						)}
					</Disclosure>
					<Routes>
						{navigation.map((item) => (
							<Route
								path={item.href} element={<item.route />}
							/>
						))}
					</Routes>
				</div>
			</BrowserRouter>
		</>
	)
}

export default App;


