import React, { FC } from 'react';
import ContentLoader from 'react-content-loader';
import {
	RenderItemProps,
	VirtualizedTableProps,
} from '../Tables/VirtualizedTable/VirtualizedTable';

export const ROW_INDENT_Y = 0;
export const FIRST_ROW_INDENT_Y = 10;

const LoadingItem: VirtualizedTableProps['ItemLoader'] = ({
	index,
	data: { rows },
	style,
}) => {
	const y = rows.length - 1 === index ? ROW_INDENT_Y : FIRST_ROW_INDENT_Y;
	const { height } = style;

	return (
		<ContentLoader height={height} style={style} width='100%'>
			<rect x='0' y={y} rx='5' ry='5' width='100%' height='100%' />
		</ContentLoader>
	);
};

export default LoadingItem;