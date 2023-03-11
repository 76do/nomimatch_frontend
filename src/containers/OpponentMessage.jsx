import React, {Fragment} from 'react';
import {styled} from '@mui/material/styles';
import {usePageTracking} from '../functions/useTracking';
import ListItem from '@mui/material/ListItem';

export const OpponentMessage = (props) => {
	usePageTracking()
	const MessageListItem = styled(ListItem)({
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		paddingRight: '0 !important',
	});

	const Value = styled('div')({
		background: 'orange',
		borderRadius: 4,
		color: 'black',
		fontSize: 14,
		fontWeight: 500,
		padding: '.5rem',
		marginRight: '1rem',
		maxWidth: '80%',
		width: 'auto',
		overflowWrap: 'break-word',
		whiteSpace: 'pre-wrap',
	});
	
	return(
		<>
		<MessageListItem>
			<Value>{props.message}</Value>
		</MessageListItem>
		</>
	)
}
