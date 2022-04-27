/* eslint-disable max-len, no-unused-vars */
import React, { forwardRef, memo, useMemo } from 'react';
import NonVirtualizedTable from '_components/Tables/NonVirtualizedTable';
import RenderVirtualizedTable from '_components/Tables/VirtualizedTable/renderComponents/RenderVirtualizedTable/RenderVirtualizedTable';
import RenderVirtualizedTableBody from '_components/Tables/VirtualizedTable/renderComponents/RenderVirtualizedTableBody/RenderVirtualizedTableBody';
import Observable from '_helpers/Observable';
import LoadingItem from '../../LoadingItem';
import { VIRTUALIZED_TABLE_PLUGINS } from './VirtualizedTable.constants';

const VirtualizedTable = memo(
	forwardRef((props, ref) => {
		const { extraPlugins } = props;

		const plugins = useMemo(
			() => [...VIRTUALIZED_TABLE_PLUGINS, ...extraPlugins],
			[extraPlugins]
		);

		return (
			<NonVirtualizedTable
				ref={ref}
				renderTable={RenderVirtualizedTable}
				renderTableBody={RenderVirtualizedTableBody(props)}
				{...props}
				extraPlugins={plugins}
			/>
		);
	})
);

export default VirtualizedTable;
