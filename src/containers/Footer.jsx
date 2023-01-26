import {styled, ThemeProvider, createTheme} from '@mui/material/styles';
import Button from '@mui/material/Button';

const Theme = createTheme({
	palette: {
		background: {
			primary: '#F5F5F5',
		},
		text: {
			primary: '#263238',
		},
	},
});

const FooterWrapper = styled('div')(({ theme }) => ({
	height: 150,
	display: 'flex',
	justifyContent: 'flex-end',
	alignItems: 'center',
	backgroundColor: theme.palette.background.primary,
	"@media screen and (max-width:480px)":{
		height: 80,
	},
}));

const FooterButton = styled(Button)(({ theme }) => ({
	fontSize: 15,
	color: theme.palette.text.primary,
	fontFamily: 'HiraKakuProN-W6',
	marginRight: 50,
	borderRadius: 10,
	"@media screen and (max-width:480px)":{
		fontSize: 8,
		marginRight: 5,
	},
}));

export const Footer = () => {
	return(
		<ThemeProvider theme={Theme} >
			<FooterWrapper>	
					<FooterButton>利用規約</FooterButton>
					<FooterButton>プライバシーポリシー</FooterButton>
					<FooterButton>お問い合わせ</FooterButton>
			</FooterWrapper>
		</ThemeProvider>
	);
};


