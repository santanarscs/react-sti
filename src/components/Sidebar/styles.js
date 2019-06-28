import styled from 'styled-components';

export const Container = styled.div`
	background: #fff;
	height: 100%;
	width: 200px;
	box-shadow: 0 0 1px 0 rgba(59, 89, 178, 0.08), 0 4px 14px rgba(59, 89, 178, 0.06);
`;
export const Header = styled.header`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 200px;
	margin-bottom: 40px;

	strong {
		font-size: 24px;
		margin-bottom: 20px;
		line-height: 21px;
		letter-spacing: 3px;
	}
	img {
		border-radius: 50%;
		width: 85px;
		height: 85px;
	}
	&:after {
		content: '';
		margin-top: 25px;
		width: 150px;
		border: 1px solid #dfe5f2;
	}
`;

export const Nav = styled.ul`
	list-style: none;
	padding-left: 20px;
	font-size: 18px;
	line-height: 25px;
	letter-spacing: 0.08em;
	li {
		margin-bottom: 40px;
		&:last-child {
			margin-bottom: 0;
		}
		a {
			text-decoration: none;
			color: currentColor;
		}
	}
`;
