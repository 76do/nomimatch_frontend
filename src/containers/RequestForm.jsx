import React, {Fragment, useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import {styled, ThemeProvider, createTheme} from '@mui/material/styles';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { receiverNameRequest } from '../apis/GetReceiverName';
import { Request } from '../apis/Request';
import Alert from '@mui/material/Alert';
import { HTTP_STATUS_CODE } from '../constants'
import Waiters from '../images/Waiters-amico.png';
import Party from '../images/Work anniversary-bro.png';
import Workers from '../images/Work anniversary-pana.png';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Slider from '@mui/material/Slider';
import { RequestDialog } from './RequestDialog';
import { RegisterRecommendDialog } from './RegisterRecommendDialog';
import {usePageTracking} from '../functions/useTracking';
import { useCookies } from 'react-cookie';

export const RequestForm = ({
	match
}) => {
	usePageTracking();
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

	const RequestFormTitle = styled('div')({
		paddingTop: 70,
		marginBottom: 50,
		fontSize: 30,
		fontFamily: 'HiraKakuProN-W6',
		textAlign: 'center',
	});

	const RequestFormDescription = styled('div')(({ theme }) => ({
		marginBottom: 50,
		fontSize: 20,
		fontFamily: 'HiraKakuProN-W6',
		textAlign: 'center',
		color: theme.palette.text.primary,
		"@media screen and (max-width:480px)":{
			fontSize: 15,
		},
	}));

	const ReceiverName = styled('span')(({ theme }) => ({
		color: theme.palette.main.primary,
	}));

	const RequestFormImage = styled('img')({
		width: '70%',
		objectFit: 'cover',
	});

	const SubmitButton = styled(Button)(({ theme }) => ({
		width: 200,
		fontSize: 15,
		color: theme.palette.text.primary,
		fontFamily: 'HiraKakuProN-W6',
		borderRadius: 50,
	}));

	const FormWrapper = styled('div')({
		margin:'0 auto',
		paddingTop: 30,
		paddingRight: 15,
		paddingLeft: 15,
		paddingBottom: 50,
		backgroundColor: '#FFFFFF',
		borderRadius: 10,
	});

	const AtmosphereWrapper = styled('div')({
		width: '100%',
	});

	const AtmosphereTextWrapper = styled('div')({
		height: 5,
		width:'100%',
		display: 'flex',
		justifyContent: 'space-between',
	});

	const AtmosphereTitle = styled('p')(({theme}) => ({
		paddingLeft: 5,
		fontSize: 12,
		fontFamily: 'roboto',
		opacity: 0.6,	
	}));

	const AtmosphereText = styled('div')(({ theme }) => ({
		width: '30%',
		fontSize: 10,
		fontFamily: 'HiraKakuProN-W6',
		textAlign: 'center',
		color: theme.palette.text.primary,
	}));

	const schema = yup.object({
		name: yup
			.string()
			.required('必須'),
		shop: yup
			.string()
			.url('URLではありません'),
	})


	const { control, handleSubmit, formState: {errors} } = useForm({
		resolver: yupResolver(schema),
		reValidateMode: 'onSubmit',
	});

	const initialState = {
		isSent: false,
		isOpenDialog: false,
		isOpenRecommendDialog: true,
		condition: false,
		errorMessages: [],
	};

	const initialRequest = {
		receiverName: '',
		name: "",
		shop: "",
		time: "",
		numberOfPeople: "",
		budget: "",
		atmosphere: "",
		message: "",
	};

	const[state, setState] = useState(initialState);
	const[request, setRequest] = useState(initialRequest);

	useEffect(() => {
		receiverNameRequest(match.params.userRandomId)
		.then((data) => {
			setState({...state, condition: true})
			setRequest({...request, receiverName: data.data.attributes.name, message: `${data.data.attributes.name}さん！飲みに行きたいです！!`})
		}).catch((e) => {
			if(e.response.status === HTTP_STATUS_CODE.BAD_REQUEST){
				setState({
					...state,
					errorMessages: e.response.data.errors,
				})
				window.scrollTo({ top: 0, behavior: "smooth"})
			}else{
				throw e;
			}
		})
	},[])

	const onSubmit = (data) => {
		let params = {
						name: data.name,
						shop: data.shop,
						time: data.time,
						numberOfPeople: data.numberOfPeople,
						budget: data.budget,
						atmosphere: data.atmosphere,
						message: data.message,
					 }
		setRequest({...request, ...params})
		setState({...state, isOpenDialog: true})
	};

	const sendRequest = (userId, params) => {
		setState({...state, isOpenDialog: false})
		Request(userId, params)
		.then((resData)=>
			setState({...state, isSent: true, isOpenDialog: true})
		).catch((e) => {
			if(e.response.status === HTTP_STATUS_CODE.BAD_REQUEST){
				setState({
					...state,
					isOpenDialog: false,
					errorMessages: e.response.data.errors,
				})
			}else{
				throw e;
			}
		})
	};

	const cookies  = useCookies(['accessToken'])[0];

	useEffect(()=> {
		window.scrollTo({ top: 0, behavior: "smooth"})
	}, [errors])

	return(
		<Fragment>
			<ThemeProvider theme={Theme}>
			<Container maxWidth='lg'>
				{
					!cookies.accessToken &&
					<RegisterRecommendDialog
					receivername = {request.receiverName}
					open={state.isOpenRecommendDialog}
					onClose={() => setState({
						...state,
						isOpenRecommendDialog: false,
					})}
					/>
				}
				{
					state.errorMessages.map((message, index)=>{
						window.scrollTo({ top: 0, behavior: "smooth"})
						return <Alert severity="error" key={index.toString}>{message}</Alert>
					})
				}
				{
					state.condition  &&
					<Fragment>
						<RequestFormTitle><ReceiverName>{request.receiverName}</ReceiverName>さん宛の飲み会依頼</RequestFormTitle>
						<RequestFormDescription>
						以下フォームから{request.receiverName}さん宛に飲み会依頼を送信できます！<br/>
						行きたいお店や希望解散時間等、あなたの希望を自由に記載してください！
						</RequestFormDescription>
						<Grid container spacing={2}>
						<Grid item 
						sm={3.5}
						sx={{
							display: {xs: 'none', sm: 'flex'},
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'space-around',
						}}>
						<RequestFormImage src={Waiters}></RequestFormImage>
						<RequestFormImage src={Party}></RequestFormImage>
						</Grid>
						<Grid item xs={12} sm={5}>
						<FormWrapper>
						<Stack spacing={3} alignItems="center">
						<Controller
							name="name"
							control={control}
							defaultValue=""
							render={({ field }) => (
								<TextField 
								{...field}
								fullWidth 
								required 
								label="あなたの名前"  
								type="name"
								error={!!errors.name}
								helperText={errors.name?.message}
							/>
							)}
						/>

						<Controller
							name="shop"
							control={control}
							defaultValue=""
							render={({ field }) => (
								<TextField 
								{...field}
								fullWidth 
								label="行きたいお店のURL"  
								type="url"
								error={!!errors.shop}
								helperText={errors.shop?.message}
							/>
							)}
						/>

						<Controller
							name="time"
							control={control}
							defaultValue={0}
							render={({ field }) => (
								<FormControl fullWidth>
									<InputLabel>希望解散時間</InputLabel>
									<Select 
									{...field}
									fullWidth
									label="希望解散時間"
									defaultValue={0}
									>
										<MenuItem value={0}>希望なし</MenuItem>
										<MenuItem value={1}>17:00</MenuItem>
										<MenuItem value={2}>18:00</MenuItem>
										<MenuItem value={3}>19:00</MenuItem>
										<MenuItem value={4}>20:00</MenuItem>
										<MenuItem value={5}>21:00</MenuItem>
										<MenuItem value={6}>22:00</MenuItem>
										<MenuItem value={7}>23:00</MenuItem>
										<MenuItem value={8}>24:00</MenuItem>
									</Select>
								</FormControl>
							)}
						/>


						<Controller
							name="numberOfPeople"
							control={control}
							defaultValue={0}
							render={({ field }) => (
								<FormControl fullWidth>
									<InputLabel>希望人数</InputLabel>
									<Select 
									{...field}
									fullWidth
									label="希望人数"
									defaultValue={0}
									>
										<MenuItem value={0}>希望なし</MenuItem>
										<MenuItem value={1}>1~5人</MenuItem>
										<MenuItem value={2}>6~10人</MenuItem>
										<MenuItem value={3}>11人以上</MenuItem>
									</Select>
								</FormControl>
							)}
						/>

						<Controller
							name="budget"
							control={control}
							defaultValue={0}
							render={({ field }) => (
								<FormControl fullWidth>
									<InputLabel>予算</InputLabel>
									<Select 
									{...field}
									fullWidth
									label="予算"
									defaultValue={0}
									>
										<MenuItem value={0}>希望なし</MenuItem>
										<MenuItem value={1}>~3000円</MenuItem>
										<MenuItem value={2}>3001~5000円</MenuItem>
										<MenuItem value={3}>5001~10000円</MenuItem>
										<MenuItem value={4}>10001~15000円</MenuItem>
										<MenuItem value={5}>15001円~</MenuItem>
									</Select>
								</FormControl>
							)}
						/>

						<AtmosphereWrapper>
							<AtmosphereTitle>
							雰囲気
							</AtmosphereTitle>
							<AtmosphereTextWrapper>
								<AtmosphereText sx={{ color: 'steelblue'}}>
								しっぽり飲みたい！
								</AtmosphereText>
								<AtmosphereText sx={{ color: 'orange'}}>
								ワイワイ騒ぎたい！
								</AtmosphereText >
							</AtmosphereTextWrapper>
							<Controller
							name="atmosphere"
							control={control}
							defaultValue={50}
							render={({ field }) => (
								<Slider 
								{...field}
								defaultValue={50} 
								aria-label="Default" 
								valueLabelDisplay="auto" 
								sx={{ color: 'gold'}}/>
							)}
							/>
						</AtmosphereWrapper>

						<Controller
							name="message"
							control={control}
							defaultValue={request.message}
							render={({ field }) => (
								<TextField 
								{...field}
								fullWidth 
								label="フリー記述"  
								multiline
								minRows={8}
								type="text"
								/>
							)}
						/>

						<SubmitButton
						sx={{ bgcolor: 'main.primary' }}
						variant='outlined'
						color='inherit'
						onClick={handleSubmit(onSubmit)}
						>確認</SubmitButton>
						</Stack>
						</FormWrapper>
						</Grid>

						<Grid 
						item sm={3.5}
						sx={{
							display: {xs: 'none', sm: 'flex'},
							flexDirection: 'column-reverse',
							alignItems: 'center',
							justifyContent: 'center',
						}}>
						<RequestFormImage src={Workers}></RequestFormImage>
						</Grid>
						</Grid>
					</Fragment>
				}
			</Container>
			{
				state.isOpenDialog &&
				<RequestDialog
				isSent={state.isSent}
				sendRequest={() => sendRequest(match.params.userRandomId, request)}
				request={request}
				isOpen={state.isOpenDialog}
				onClose={() => setState({
					...state,
					isOpenDialog: false,
					isSent: false,
				})}
				/>
			}
			</ThemeProvider>
		</Fragment>
	)
}

