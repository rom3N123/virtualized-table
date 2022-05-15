import React, { FC, Ref } from 'react';
import { UseTableHeaderGroupProps } from 'react-table';

export type HeaderRowProps<D extends object = {}> = {
	headerGroups: UseTableHeaderGroupProps<D>['headers'];
	headerRef?: Ref<HTMLDivElement>;
	height?: number;
	fullWidthHeader?: boolean;
};

const HeaderRow: FC<HeaderRowProps> = ({
	headerGroups,
	headerRef,
	height,
	fullWidthHeader = true,
}) => {
	return (
		<div ref={headerRef} style={{ overflow: 'hidden', height }}>
			{headerGroups.map(headerGroup => (
				<div
					{...headerGroup.getHeaderGroupProps({
						style: {
							[fullWidthHeader ? 'width' : '']: '100%',
						},
					})}
					className='table-header'
				>
					{headerGroup.headers.map(column => {
						return (
							<div {...column.getHeaderProps(column.getSortByToggleProps())}>
								{column.render('Header')}

								{column.canResize && column.getResizerProps && (
									<div
										{...column.getResizerProps()}
										className={`resizer ${
											column.isResizing ? 'isResizing' : ''
										}`}
									/>
								)}
							</div>
						);
					})}
				</div>
			))}
		</div>
	);
};

export default HeaderRow;
