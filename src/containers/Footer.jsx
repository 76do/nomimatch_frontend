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
	height: 100,
	backgroundColor: theme.palette.background.primary,
}));

const FooterButtons = styled('div')({
	textAlign: 'right',
});

const FooterButton = styled(Button)(({ theme }) => ({
	fontSize: 15,
	color: theme.palette.text.primary,
	fontFamily: 'HiraKakuProN-W6',
	marginRight: 50,
	borderRadius: 10,
}));

export const Footer = () => {
	return(
		<ThemeProvider theme={Theme} >
			<FooterWrapper>	
				<FooterButtons>
					<FooterButton>利用規約</FooterButton>
					<FooterButton>プライバシーポリシー</FooterButton>
					<FooterButton>お問い合わせ</FooterButton>
				</FooterButtons>	
			</FooterWrapper>
		</ThemeProvider>
	);
};


