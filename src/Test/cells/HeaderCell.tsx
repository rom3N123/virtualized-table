import React, { FC } from 'react';
import { HeaderRenderer } from 'react-table';
import { Data } from '../TestPage';

const HeaderCell: FC<{ value: string }> = ({ value }) => {
	return (
		<div
			style={{
				backgroundColor: 'rgba(0,0,0, .8)',
				color: '#fff',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				width: '100%',
				height: '100%',
			}}
		>
			{value}
		</div>
	);
};

export default HeaderCell;
