import React from 'react';

import { Container, Header, Content, NewOrder, OrderList } from './styles';

import Profile from '../../assets/images/a2.jpg';

export default function Order() {
	return (
		<Container>
			<Header>
				<button>Filtrar e ordenar</button>
				<input type="text" placeholder="Procurar..." />
			</Header>
			<Content>
				<NewOrder>Novo</NewOrder>
				<OrderList>
					<li>
						<img src={Profile} alt="Profile" />
						2S Santana - STI - há 30 minutos - <a href="#">Ação</a>
					</li>
				</OrderList>
			</Content>
		</Container>
	);
}
