import {styled, ThemeProvider, createTheme} from '@mui/material/styles';
import Button from '@mui/material/Button';
import{
	useHistory,
} from "react-router-dom";

const Theme = createTheme({
	palette: {
		background: {
			primary: '#F5F5F5',
		},
		text: {
			primary: '#263238',
		},
		main: {
			primary: '#ffa500',
			secondary: '#ffd700',
		},
	},
});

const FooterWrapper = styled('div')(({ theme }) => ({
	height: 60,
	position: 'sticky',
	Top:'100%',
	bottom: 0,
	zIndex: 999,
	width: '100%',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	backgroundColor: theme.palette.background.primary,
}));

const FooterButton = styled(Button)(({ theme, props }) => ({
	width: 100,
	fontSize: 10,
	color: theme.palette.text.primary,
	fontFamily: 'HiraKakuProN-W6',
	borderRadius: 50,
}));

export const LoginFooterSP = () => {
	const history = useHistory();
	return(
		<ThemeProvider theme={Theme} >
			<FooterWrapper>	
					<FooterButton
						sx={{ mr: 1, bgcolor: 'main.primary'}}
						variant='outlined'
						color='inherit'
						onClick={()=>{
							history.push("/mypage", {loginNotice: false});
						}}
					>マイページ</FooterButton>
					<FooterButton
						sx={{ ml: 1,bgcolor: 'main.secondary'}}
						variant='outlined'
						color='inherit'
						onClick={()=>{
							history.push("/chats");
						}}
					>チャット一覧</FooterButton>
			</FooterWrapper>
		</ThemeProvider>
	);
};


