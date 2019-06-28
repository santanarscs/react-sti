import React, { useState } from 'react';
import { Container } from './styles';
export default function Course() {
	const [newCourse, addNewCourse] = useState('');
	const [courses, setCourse] = useState([]);

	function handleInputChange(e) {
		addNewCourse(e.target.value);
	}
	function handleAddCourse(e) {
		e.preventDefault();
		setCourse([...courses, { id: Math.random(), name: newCourse }]);
		addNewCourse('');
	}
	function handleRemoveCourse(id) {
		const newCourses = courses.filter(course => course.id !== id);
		setCourse(newCourses);
	}
	return (
		<Container>
			<form onSubmit={handleAddCourse}>
				<input type="text" name="newCourse" value={newCourse} onChange={handleInputChange} />
				<button type="submit">Adicionar</button>
			</form>
			<hr />
			<ul>
				{courses.map(course => (
					<li key={course.id}>
						<div>{course.name}</div>
						<button onClick={() => handleRemoveCourse(course.id)}>Remover</button>
					</li>
				))}
			</ul>
		</Container>
	);
}
