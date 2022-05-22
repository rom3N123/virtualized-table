import React, { ReactElement, Ref } from 'react';
import { UseTableHeaderGroupProps } from 'react-table';

export type HeaderRowProps<D extends object = {}> = {
	headerGroups: UseTableHeaderGroupProps<D>['headers'];
	headerRef?: Ref<HTMLDivElement>;
	height?: number;
	fullWidthHeader?: boolean;
};

export const HeaderRow = <D extends object>({
	headerGroups,
	headerRef,
	height,
	fullWidthHeader = true,
}: HeaderRowProps<D>): ReactElement => {
	return (
		<div ref={headerRef} style={{ overflow: 'hidden', height }}>
			{headerGroups.map(headerGroup => (
				<div
					{...headerGroup.getHeaderGroupProps({
						style: {
							[fullWidthHeader ? 'width' : '']: '100%',
							height: '100%',
						},
					})}
					className='table-header'
				>
					{headerGroup.headers.map(column => {
						const { minWidth, grow } = column;

						return (
							<div
								{...column.getHeaderProps({
									style: {
										minWidth,
										flexGrow: grow,
									},
									...column.getSortByToggleProps?.(),
								})}
							>
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
