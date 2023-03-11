import React, {Fragment, useState, useContext, useEffect, useLayoutEffect} from 'react';
import {styled, ThemeProvider, createTheme} from '@mui/material/styles';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { getUserRequests } from '../apis/GetRequests';
import { getCurrentUser } from '../apis/GetCurrentUserInfo';
import { getChats } from '../apis/GetChats';
import { UserUpdate } from '../apis/UserUpdate';
import Alert from '@mui/material/Alert';
import { UserInfoContext } from '../providers/UserInfoProvider';
import ListItemButton from '@mui/material/ListItemButton';
import { FixedSizeList } from 'react-window';
import MarkAsUnreadOutlinedIcon from '@mui/icons-material/MarkAsUnreadOutlined';
import { RequestHistoryDialog } from './RequestHistoryDialog';
import { useCookies } from 'react-cookie';
import Fade from '@mui/material/Fade';
import CircularProgress from '@mui/material/CircularProgress';
import{
	useLocation
} from "react-router-dom";
import {usePageTracking} from '../functions/useTracking';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ChatIcon from '@mui/icons-material/Chat';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import{
	useHistory,
} from "react-router-dom";

export const PrivacyPolicy = () => {
	usePageTracking();
	const Theme = createTheme({
		palette: {
			text: {
				primary: '#263238',
			},
			main: {
				primary: '#ffa500'
			},	
			primary: {
				main: '#ffa500'
			}
		},
	});
	const cookies  = useCookies(['accessToken'])[0];
	const {userInfo, setUserInfo} = useContext(UserInfoContext);
	const initialFetchState = {
		fetching: true,
		fetched: false 
	};
	const [fetchState, setFetchState] = useState(initialFetchState);
	const initialState = {
		updateSuccess: false,
	};
	const [state, setState] = useState(initialState);

	const PrivacyPolicyTitle = styled('div')({
		marginBottom: 25,
		paddingTop: 20,
		fontSize: 30,
		fontFamily: 'HiraKakuProN-W6',
		textAlign: 'center',
		"@media screen and (max-width:480px)":{
			fontSize: 25,
		},
	})

	const PrivacyPolicyWrapper = styled('div')({
		display: 'flex',
		flexFlow: 'column',
		width: '70%',
		"@media screen and (max-width:480px)":{
			width: '80%',
		},
		paddingTop: 30,
		paddingBottom: 30,
		paddingLeft:15,
		paddingRight:15,
		backgroundColor: '#FFFFFF',
		borderRadius: 10,
		overFlowWrap: 'break-word',
	});

	const ParagraphTitle = styled('div')({
		fontSize: 20,
		fontFamily: 'HiraKakuProN-W6',
		"@media screen and (max-width:480px)":{
			fontSize: 15,
		},
	});

	const ParagraphDescription = styled('p')({
		fontSize: 13,
		"@media screen and (max-width:480px)":{
			fontSize: 10,
		},
	});

	const UrlLink = styled('a')({
		wordBreak: 'break-all',
	});

	return(
		<Fragment>
			<ThemeProvider theme={Theme}>
			<Container maxWidth='lg'>
			<PrivacyPolicyTitle>
			プライバシーポリシー
			</PrivacyPolicyTitle>
			</Container>
			<Stack alignItems='center'>
			<PrivacyPolicyWrapper>
			<ParagraphTitle>
			お客様から取得する情報
			</ParagraphTitle>
			<ParagraphDescription>
			当サイトは、お客様から以下の情報を取得します。<br/>
			・氏名(ニックネームやペンネームも含む)<br/>
			・メールアドレス<br/>
			・Cookie(クッキー)を用いて生成された識別情報<br/>
			・当サイトの滞在時間、入力履歴、購買履歴等の当サイトにおけるお客様の行動履歴<br/>
			</ParagraphDescription>
			<ParagraphTitle>
			お客様の情報を利用する目的
			</ParagraphTitle>
			<ParagraphDescription>
			当サイトは、お客様から取得した情報を、以下の目的のために利用します。<br/>
			・当サイトに関する登録の受付、お客様の本人確認、認証のため<br/>
			・お客様の当サイトの利用履歴を管理するため<br/>
			・当サイトにおけるお客様の行動履歴を分析し、当サイトの維持改善に役立てるため<br/>
			・当サイトに関するご案内をするため<br/>
			・お客様からのお問い合わせに対応するため<br/>
			・当サイトの規約や法令に違反する行為に対応するため<br/>
			・当サイトの変更、提供中止、終了、契約解除をご連絡するため<br/>
			・当サイト規約の変更等を通知するため<br/>
			・以上の他、当サイトの提供、維持、保護及び改善のため<br/>
			</ParagraphDescription>
			<ParagraphTitle>
			安全管理のために講じた措置
			</ParagraphTitle>
			<ParagraphDescription>
			当サイトが、お客様から取得した情報に関して安全管理のために講じた措置につきましては、末尾記載のお問い合わせ先にご連絡をいただきまし
			たら、法令の定めに従い個別にご回答させていただきます。
			</ParagraphDescription>
			<ParagraphTitle>
			第三者提供
			</ParagraphTitle>
			<ParagraphDescription>
			当サイトは、お客様から取得する情報のうち、個人データ（個人情報保護法第２条第６項）に該当するものついては、あらかじめお客様の同意を
			得ずに、第三者（日本国外にある者を含みます。）に提供しません。<br/>
			但し、次の場合は除きます。<br/>
			・個人データの取扱いを外部に委託する場合<br/>
			・当サイトが買収された場合<br/>
			・事業パートナーと共同利用する場合（具体的な共同利用がある場合は、その内容を別途公表します。）<br/>
			・その他、法律によって合法的に第三者提供が許されている場合<br/>
			</ParagraphDescription>
			<ParagraphTitle>
			アクセス解析ツール
			</ParagraphTitle>
			<ParagraphDescription>
			当サイトは、お客様のアクセス解析のために、「Googleアナリティクス」を利用しています。Googleアナリティクスは、トラフィックデータの収
			集のためにCookieを使用しています。トラフィックデータは匿名で収集されており、個人を特定するものではありません。Cookieを無効にす
			れば、これらの情報の収集を拒否することができます。詳しくはお使いのブラウザの設定をご確認ください。Googleアナリティクスについ
			て、詳しくは以下からご確認ください。<br/>
			<UrlLink href="https://marketingplatform.google.com/about/analytics/terms/jp/">https://marketingplatform.google.com/about/analytics/terms/jp/</UrlLink>
			</ParagraphDescription>
			<ParagraphTitle>
			プライバシーポリシーの変更
			</ParagraphTitle>
			<ParagraphDescription>
			当サイトは、必要に応じて、このプライバシーポリシーの内容を変更します。この場合、変更後のプライバシーポリシーの施行時期と内容を適切<br/>
			な方法により周知または通知します。<br/>
			</ParagraphDescription>
			<ParagraphTitle>
			お問い合わせ
			</ParagraphTitle>
			<ParagraphDescription>
			お客様の情報の開示、情報の訂正、利用停止、削除をご希望の場合は、お問い合わせにご連絡ください。
			この場合、必ず、運転免許証のご提示等当社が指定する方法により、ご本人からのご請求であることの確認をさせていただきます。なお、情
			報の開示請求については、開示の有無に関わらず、ご申請時に一件あたり1,000円の事務手数料を申し受けます。
			</ParagraphDescription>
			<ParagraphDescription>
			2023年03月11日制定
			</ParagraphDescription>
			</PrivacyPolicyWrapper>
			</Stack>
			</ThemeProvider>
		</Fragment>
	)
}
