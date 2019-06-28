import styled from 'styled-components';

export const Container = styled.div`padding-top: 20px;`;
export const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20px;
	button {
		background: transparent;
		border: 0;
		letter-spacing: 0.08em;
		font-size: 18px;
		line-height: 25px;
		color: #6f7380;
		transition: background-color 0.15s ease;
		&:hover {
			color: #557cf2;
		}
	}
	input {
		width: 300px;
		font: inherit;
		margin: 0;
		touch-action: manipulation;
		color: #4e5159;
		padding: 0.5rem 0.75rem;
		border-radius: 0.5rem;
		background: #fff;
		border: 0;
		height: 50px;
		box-shadow: 0 0 1px 0 rgba(59, 89, 178, 0.08), 0 4px 14px rgba(59, 89, 178, 0.06);
		transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
		&:focus {
			box-shadow: 0 0 1px 0 rgba(59, 89, 178, 0.16), 0 4px 14px rgba(59, 89, 178, 0.12);
		}
	}
`;
export const Content = styled.div``;
export const NewOrder = styled.button`
	width: 100%;
	background: transparent;
	border: 2px dashed #557cf2;
	height: 80px;
	transition: border 0.15s ease-in-out;
	&:hover {
		border: 2px dashed #a9bbf2;
	}
	margin-bottom: 20px;
`;
export const OrderList = styled.ul`
	list-style: none;
	li {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: #fff;
		padding: 20px;
		border-radius: 4px;
		box-shadow: 0 0 1px 0 rgba(59, 89, 178, 0.08), 0 4px 14px rgba(59, 89, 178, 0.06);
		img {
			border-radius: 50%;
			width: 50px;
			height: 50px;
		}
	}
`;
