import React from 'react';
import { mount } from 'enzyme';

import Course from '../../Course';

it('should render the list and button ', () => {
	const wrapper = mount(<Course />);
	expect(wrapper.find('ul').exists()).toBe(true);
	expect(wrapper.find('input[name="newCourse"]').exists()).toBe(true);
	expect(wrapper.find('button').exists()).toBe(true);
});
it('should be able to add new course', () => {
	const wrapper = mount(<Course />);

	wrapper.find('input[name="newCourse"]').simulate('change', {
		target: { value: 'Novo Curso' }
	});
	wrapper.find('form').simulate('submit');
	expect(
		wrapper.find('ul').contains(
			<li>
				<div>Novo Curso</div>
				<button>Remover</button>
			</li>
		)
	).toBe(true);
});
