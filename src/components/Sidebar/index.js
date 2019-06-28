import React from 'react';
import { Container, Header, Nav } from './styles';
import Profile from '../../assets/images/a2.jpg';
export default function Sidebar() {
	return (
		<Container>
			<Header>
				<strong>STI</strong>
				<img src={Profile} alt="Profile" />
				<span>Usuário Logado</span>
				<small>Unidade</small>
			</Header>
			<section>
				<Nav>
					<li>
						<a href="/">Home</a>
					</li>
					<li>
						<a href="/">Serviços</a>
					</li>
					<li>
						<a href="/">Equipamentos</a>
					</li>
				</Nav>
			</section>
		</Container>
	);
}
