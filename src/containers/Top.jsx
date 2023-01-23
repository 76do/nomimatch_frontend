import Container from '@mui/material/Container';
import MainLogo from '../images/brandmark-design.png';
import DrinkPerson from '../images/beer-celebration-cuate.png';
import URL from '../images/www-amico.png';
import Form from '../images/Customer Survey-amico.png';
import Notification from '../images/New notifications-amico.png';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import {styled, ThemeProvider, createTheme} from '@mui/material/styles';

export const Top = () => {
	const Theme = createTheme({
		palette: {
			text: {
				primary: '#263238',
			},
			main: {
				primary: '#ffa500'
			},
		},
	});

	const TopImageWrapper = styled('div')({
		display: 'flex',
		justifyContent: 'space-between',
		"@media screen and (max-width:480px)":{
			justifyContent: 'center',
			marginBottom: 30,
		},
	});

	const MainTitleWrapper = styled('div')({
		paddingTop: 120,
		"@media screen and (max-width:480px)":{
			paddingTop: 30,
		},
	});

	const SubTitle = styled('div')({
		fontFamily: 'HiraKakuProN-W6',
		color: '#696969',
		fontSize: 30,
		"@media screen and (max-width:480px)":{
			fontSize: 15,
			textAlign: 'center',
		},
	});

	const MainLogoImage = styled('img')({
		height: 140,
		marginBottom: 30,
	}); 

	const DrinkPersonImage = styled('img')({
		height: 520,	
		"@media screen and (max-width:480px)":{
			display: 'none',
		},
	});

	const FunctionTitle = styled('div')({
		fontFamily: 'HiraKakuProN-W6',
		fontSize: 40,
		marginTop: 100,
		marginBottom: 50, 
		textAlign: 'center',
		"@media screen and (max-width:480px)":{
			fontSize: 20,
			marginBottom: 20, 
		},
		color: '#333333'
	});

	const FunctionCompo = styled('div')({
		"@media screen and (max-width:480px)":{
			width: 400,
		},
	});

	const FunctionHeadline = styled('div')({
		fontFamily: 'HiraKakuProN-W6',
		fontSize: 30,
		marginBottom: 20, 
		color: '#333333',
		"@media screen and (max-width:480px)":{
			fontSize: 20,
		},
	});

	const FunctionDescription = styled('div')({
		fontFamily: 'HiraKakuProN-W6',
		fontSize: 20,
		fontWeight: 'bold',
		color: '#696969',
		"@media screen and (max-width:480px)":{
			fontSize: 12,
		},
	});

	const FunctionImage = styled('img')({
		height: 350,
	});

	const SignInButton = styled(Button)(({ theme, props }) => ({
		width: 200,
		fontSize: 15,
		color: theme.palette.text.primary,
		fontFamily: 'HiraKakuProN-W6',
		borderRadius: 50,
	}));

	return(
	  		<ThemeProvider theme={Theme}>
			<Container maxWidth="lg">
				<TopImageWrapper>
					<MainTitleWrapper>
						<MainLogoImage src={MainLogo}/>
						<SubTitle>上司と部下の飲みニケーションを促進します。</SubTitle>
					</MainTitleWrapper>
					<DrinkPersonImage src={DrinkPerson}/>
				</TopImageWrapper>
				<Grid container spacing={2} justifyContent='center'>
					<Grid item>
						<SignInButton
						sx={{ mb: 4, bgcolor: 'main.primary' }}
						variant='outlined'
						color='inherit'
						>さっそくはじめる！</SignInButton>
					</Grid>
				</Grid>
				<FunctionTitle>ノミマチ！でできること</FunctionTitle>
				<Grid container spacing={2} justifyContent='center'>
					<Grid item md={8}>
						<FunctionCompo>
						<FunctionHeadline>①あなた専用のURLを発行</FunctionHeadline>
						<FunctionDescription>
						あなた宛に飲み会依頼を送信できるリンクを発行します。<br/>		
						リンクを拡散して、あなた宛に飲み会依頼が届くのを待ちましょう。
						</FunctionDescription>
						</FunctionCompo>
					</Grid>
					<Grid item md={4}>
						<FunctionImage src={URL}/>		
					</Grid>
				</Grid>
				<Grid container spacing={2} direction='row-reverse' justifyContent='center'>
					<Grid item md={8}>
						<FunctionCompo>
						<FunctionHeadline>②専用フォームから飲み会依頼を作成</FunctionHeadline>
						<FunctionDescription>
						①で作成したURLから飲み会依頼作成フォームへ遷移します。<br/>		
						フォームでは、希望解散時間や予算、飲み会の雰囲気等を細かく指定し、<br/>
						無理なく上司に飲み会の要望を伝えることができます!
						</FunctionDescription>
						</FunctionCompo>
					</Grid>
					<Grid item md={4}>
						<FunctionImage src={Form}/>		
					</Grid>
				</Grid>
				<Grid container spacing={2} justifyContent='center'>
					<Grid item md={8}>
						<FunctionCompo>
						<FunctionHeadline>③通知機能</FunctionHeadline>
						<FunctionDescription>
						あなた宛に届いた飲み会依頼を通知でお知らせします!<br/>		
						</FunctionDescription>
						</FunctionCompo>
					</Grid>
					<Grid item md={4}>
						<FunctionImage src={Notification}/>		
					</Grid>
				</Grid>
				<Grid container spacing={2} justifyContent='center'>
					<Grid item>
						<SignInButton
						sx={{ mb: 4, bgcolor: 'main.primary' }}
						variant='outlined'
						color='inherit'
						>登録はこちら!</SignInButton>
					</Grid>
				</Grid>
			</Container>
			</ThemeProvider>
	)
}
