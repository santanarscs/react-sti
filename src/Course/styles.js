import styled from 'styled-components';

export const Container = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 70px;

	input {
		height: 40px;
		padding: 10px;
		font-size: 16px;
		border: 1px solid rgba(0, 0, 0, 0.3);
		background-color: rgba(0, 0, 0, 0.1);
		border-radius: 3px;
		color: #6f7380;
		transition: border 0.15s ease;
		&:focus {
			border-color: #7289da;
		}
	}
	form button {
		margin-left: 10px;
		border-radius: 3px;
		transition: background-color 0.15s ease;
		background: #7289da;
		border: 0;
		color: #fff;
		padding: 0 10px;
		text-transform: uppercase;
		font-weight: 700;
		height: 40px;
		font-size: 18px;
		&:hover {
			background: #5f73bc;
		}
	}
	ul {
		list-style: none;
		margin-top: 20px;
		li {
			display: flex;
			margin-top: 10px;
			align-items: center;
		}
		li button {
			border-radius: 3px;
			background: #fcd9dd;
			color: #f26b7a;
			border: 0;
			padding: 10px;
			font-weight: bold;

			letter-spacing: 1px;
			margin-left: 20px;
		}
		li > div {
			width: 140px;
			background: #fff;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 60px;
			border-radius: 3px;
		}
	}
`;
