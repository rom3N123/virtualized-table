/* eslint-disable max-len, no-unused-vars */
import React, { forwardRef, memo, useMemo } from 'react';
import NonVirtualizedTable from '_components/Tables/NonVirtualizedTable';
import RenderVirtualizedTable from '_components/Tables/VirtualizedTable/renderComponents/RenderVirtualizedTable/RenderVirtualizedTable';
import RenderVirtualizedTableBody from '_components/Tables/VirtualizedTable/renderComponents/RenderVirtualizedTableBody/RenderVirtualizedTableBody';
import {
    arrayOf,
    bool,
    elementType,
    func,
    number,
    oneOfType,
    shape,
} from 'prop-types';
import Observable from '_helpers/Observable';
import LoadingItem from '_components/Tables/VirtualizedTable/components/LoadingItem';
import { VIRTUALIZED_TABLE_PLUGINS } from './VirtualizedTable.constants';

/**
 * @template T
 * @typedef {{ id: string, index: number, original: T}} UseTableRow
 * @typedef {{
 *     isSelectionModeObservable: Observable,
 *     changeTableSelectionMode: function(): void,
 *     enableTableSelectionMode: function(): void,
 *     disableTableSelectionMode: function(): void,
 *
 *     areAllRowsSelectedObservable: Observable,
 *     selectedCacheById: Object.<string, UseTableRow>,
 *     selectedCacheArrayRef: UseTableRow[],
 *     toggleRowSelected: function(index: number): void,
 *     toggleAllRowsSelected: function(): void,
 *     getIsSelectedRow: function(row: UseTableRow): boolean,
 *     clearSelectedRows: function(): void,
 *
 *     highlightedRowRef: { current: UseTableRow|null },
 *     previousHighlightedRowIndexRef: { current: number|undefined },
 *     onHighlightRow: function(index: number): void
 *  }} InstancePluginsMethods
 *
 * @param {object} props
 * @param {T} props.data
 *
 * @param {{ instance: InstancePluginsMethods }} ref
 *
 * @description
 * 1. Если нужно получать массив выделенных строк, использовать TableRowsSelectionContextProvider, пример - InspectionsPnrRegister
 * 2. Если нужно узнать, выделена строка в режиме выделения или просто выделена - пропсы isSelected/isHighlighted, которые приходят в ячейку
 *  пример - VirtualizedTableDragHandleCell
 * 3. Если нужно узнать, включен ли режим выделения - используй фунцию getTableSelectionModeProps из row, пример - VirtualizedTableDragHandleCell
 * 4. Если нужно узнать, выделены ли все строки - подпишись на areAllRowsSelectedObservable, пример - VirtualizedTableHeaderSelectCell
 */
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

VirtualizedTable.propTypes = {
    data: arrayOf(
        shape({
            id: number,
        })
    ),
    headerHeight: number,
    getItemSize: oneOfType([func, number]),
    extraPlugins: arrayOf(func),

    // Пропсы для подгрузки данных
    hasNextPage: bool,
    loadPerPage: number,
    onLoadPage: func,
    isLoadingNextPage: bool,
    ItemLoader: elementType, // Компонент, который будет отображаться вместо строки, пока она будет загружаться
    preselectedRows: arrayOf(shape({ id: number })),
};

VirtualizedTable.defaultProps = {
    headerHeight: 50,
    data: [],
    getItemSize: 50,
    extraPlugins: [],
    hasNextPage: false,
    loadPerPage: 10,
    onLoadPage: () => {},
    isLoadingNextPage: false,
    ItemLoader: LoadingItem,
    preselectedRows: [],
};

export default VirtualizedTable;
