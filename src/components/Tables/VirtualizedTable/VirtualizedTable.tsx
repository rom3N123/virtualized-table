import React, { FC, ReactElement, forwardRef, memo, useMemo } from 'react';
import { VIRTUALIZED_TABLE_PLUGINS } from './VirtualizedTable.constants';
import {
	Column,
	GetRowId,
	PluginHook,
	useBlockLayout,
	useExpanded,
	useTable,
} from 'react-table';
import NonVirtualizedTable from '../NonVirtualizedTable/NonVirtualizedTable';
import RenderVirtualizedTable from './renderComponents/RenderVirtualizedTable';
import RenderVirtualizedTableBody from './renderComponents/RenderVirtualizedTableBody';
import { HeaderRowProps } from '../../HeaderRow/HeaderRow';

type VirtualizedTableProps = {
	data: object[];
	columns: Column[];
	getRowId: GetRowId;
	extraPlugins?: PluginHook<object>[];
	HeaderRow: FC<HeaderRowProps>;
	TableBody: FC;
};

const VirtualizedTable: FC = memo(
	forwardRef<{}, VirtualizedTableProps>(
		(
			{
				data,
				columns,
				getRowId,
				extraPlugins = [],
				HeaderRow,
				TableBody,
				...useTableProps
			},
			ref
		): ReactElement => {
			const instance = useTable(
				{
					data,
					columns,
					getRowId,
					...useTableProps,
				},
				useBlockLayout,
				useExpanded,
				// useSticky,
				...extraPlugins
			);

			const {
				getTableBodyProps,
				headerGroups,
				rows,
				prepareRow,
				totalColumnsWidth,
			} = instance;

			const plugins = useMemo(
				() => [...VIRTUALIZED_TABLE_PLUGINS, ...extraPlugins],
				[extraPlugins]
			);

			return (
				<div>
					<HeaderRow headerGroups={headerGroups} />

					<TableBody />
				</div>
				// <NonVirtualizedTable
				// 	ref={ref}
				// 	renderTable={RenderVirtualizedTable}
				// 	renderTableBody={RenderVirtualizedTableBody(props)}
				// 	{...props}
				// 	extraPlugins={plugins}
				// />
			);
		}
	)
);

export default VirtualizedTable;
