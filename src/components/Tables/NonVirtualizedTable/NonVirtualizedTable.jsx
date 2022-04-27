import React, { forwardRef, memo, useImperativeHandle } from 'react';
import { useBlockLayout, useExpanded, useTable } from 'react-table';
import HeaderRow from '_components/NewTable/components/HeaderRow';
import NonVirtualizedTableBody from '_components/Tables/NonVirtualizedTable/components/NonVirtualizedTableBody';
import {
    arrayOf,
    elementType,
    func,
    number,
    object,
    oneOfType,
    shape,
    string,
    bool,
} from 'prop-types';
import { onDragEnd } from '_components/NewTable/Table.constants';
import TableRow from '_components/Tables/NonVirtualizedTable/components/TableRow';
import DefaultRenderTable from '_components/Tables/NonVirtualizedTable/DefaultRenderTable';
import { useSticky } from 'react-table-sticky';

const NonVirtualizedTable = memo(
    forwardRef(
        (
            {
                data,
                columns,
                getRowId,
                headerHeight,
                maxRowHeight,
                rowProps,
                onReorder,
                onCombine,
                RenderClone,
                onDragMoveEnd,
                dragDropContextProps,
                isCombineEnabled,
                renderTable,
                renderTableBody,
                extraPlugins,
                HeaderRow,
                TableRow,
                className,
                // Пропсы для виртулизированной таблицы
                listRef,
                getItemSize,
                RenderItem,
                ...useTableProps
            },
            ref
        ) => {
            const instance = useTable(
                {
                    data,
                    columns,
                    getRowId,
                    autoResetExpanded: false,
                    ...useTableProps,
                },
                useBlockLayout,
                useExpanded,
                useSticky,
                ...extraPlugins
            );

            const {
                getTableBodyProps,
                headerGroups,
                rows,
                prepareRow,
                totalColumnsWidth,
            } = instance;

            useImperativeHandle(ref, () => ({
                instance,
            }));

            const dragDropContext = {
                onDragEnd: onDragEnd({
                    onCombine,
                    onReorder,
                    rows,
                    onDragMoveEnd,
                }),
                ...dragDropContextProps,
            };

            return renderTable({
                instance,
                header: (
                    <HeaderRow
                        fullWidthHeader
                        height={headerHeight}
                        headerGroups={headerGroups}
                    />
                ),
                body: (
                    <NonVirtualizedTableBody
                        className={className}
                        tableRef={ref}
                        listRef={listRef}
                        dragDropContext={dragDropContext}
                        rows={rows}
                        prepareRow={prepareRow}
                        getTableBodyProps={getTableBodyProps}
                        totalColumnsWidth={totalColumnsWidth}
                        maxRowHeight={maxRowHeight}
                        getRowId={getRowId}
                        rowProps={rowProps}
                        RenderClone={RenderClone}
                        isCombineEnabled={isCombineEnabled}
                        renderTableBody={renderTableBody}
                        instance={instance}
                        getItemSize={getItemSize}
                        RenderItem={RenderItem}
                        TableRow={TableRow}
                    />
                ),
            });
        }
    )
);

/* eslint-disable react/forbid-prop-types */
NonVirtualizedTable.propTypes = {
    renderTable: func,
    dragDropContextProps: shape({
        onDragEnd: func,
    }),
    data: arrayOf(shape({ id: number })),
    columns: arrayOf(
        shape({
            accessor: string,
            id: string,
            Header: elementType,
            Cell: elementType,
        })
    ),
    getRowId: func,
    headerHeight: number,
    maxRowHeight: oneOfType([string, number]),
    rowProps: oneOfType([object, func]),
    onReorder: func,
    onCombine: func,
    RenderClone: elementType,
    onDragMoveEnd: func,
    isCombineEnabled: bool,
    renderTableBody: func,
    extraPlugins: arrayOf(func),
    RenderItem: elementType,
    HeaderRow: elementType,
    TableRow: elementType,
    className: string,
};

const emptyFunc = () => {};

NonVirtualizedTable.defaultProps = {
    data: [],
    columns: [],
    getRowId: (row) => row.id,
    headerHeight: 50,
    maxRowHeight: 'auto',
    rowProps: {},
    onReorder: emptyFunc,
    onCombine: emptyFunc,
    RenderClone: TableRow,
    onDragMoveEnd: emptyFunc,
    dragDropContextProps: {},
    isCombineEnabled: false,
    renderTable: DefaultRenderTable,
    extraPlugins: [],
    className: '',
    HeaderRow,
    TableRow,
};

export default NonVirtualizedTable;
