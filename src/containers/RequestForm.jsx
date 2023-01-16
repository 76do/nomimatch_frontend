import React, {Fragment} from 'react';

export const RequestForm = ({
	match
}) => {
	return(
		<Fragment>
		飲み会依頼送信フォーム	
		<p>{match.params.userRandomId}</p>
		</Fragment>
	)
}
