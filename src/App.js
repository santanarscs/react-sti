import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import GlobalSytles from './styles/global';
import { Wrapper, Container, Content } from './styles/components';

import Routes from './routes';

import Sidebar from './components/Sidebar';
import Header from './components/Header';

export default function App() {
	return (
		<BrowserRouter>
			<GlobalSytles />
			<Wrapper>
				<Container>
					<Sidebar />
					<Content>
						<Header />
						<Routes />
					</Content>
				</Container>
			</Wrapper>
		</BrowserRouter>
	);
}
