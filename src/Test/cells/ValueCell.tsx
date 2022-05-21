import React, { FC } from 'react';

const ValueCell: FC<{ value: string }> = ({ value }) => {
	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			{value}
		</div>
	);
};

export default ValueCell;
