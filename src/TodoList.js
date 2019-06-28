import React, { Fragment, useState, useEffect } from 'react';

// import { Container } from './styles';

export default function TodoList() {
	const [repos, setRepos] = useState([]);

	function handleAddRepository() {
		setRepos([...repos, { id: Math.random(), name: 'novo Repo' }]);
	}
	function handleFavorite(id) {
		const newRepos = repos.map(repo => {
			return repo.id === id ? { ...repo, favorite: !repo.favorite } : repo;
		});
		setRepos(newRepos);
	}
	useEffect(() => {
		async function fetchData() {
			const response = await fetch('https://api.github.com/users/santanarscs/repos');
			const data = await response.json();
			setRepos(data);
		}

		fetchData();
	}, []);
	return (
		<Fragment>
			<ul>
				{repos.map(repo => (
					<li key={repo.id}>
						{repo.name}
						{repo.favorite && <span>(Favoritoo)</span>}
						<button onClick={() => handleFavorite(repo.id)}>Favoritar</button>
					</li>
				))}
			</ul>

			<button onClick={handleAddRepository}>Adicionar Repo</button>
		</Fragment>
	);
}
