/* eslint-disable max-len */
import React from 'react';
import {
    arrayOf,
    bool,
    elementType,
    func,
    number,
    oneOfType,
    shape,
    string,
    object,
    any,
} from 'prop-types';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import TableRow from '_components/Tables/NonVirtualizedTable/components/TableRow';
import RenderRenderClone from '_components/Tables/NonVirtualizedTable/components/NonVirtualizedTableBody/RenderRenderClone';
import RenderTableBody from '_components/Tables/NonVirtualizedTable/components/NonVirtualizedTableBody/RenderTableBody/RenderTableBody';

const NonVirtualizedTableBody = (props) => {
    const {
        dragDropContext,
        isCombineEnabled,
        RenderClone,
        renderTableBody,
        mode,
        listRef,
    } = props;

    return (
        <DragDropContext {...dragDropContext}>
            <Droppable
                droppableId="table-droppable"
                isCombineEnabled={isCombineEnabled}
                renderClone={RenderRenderClone(RenderClone, props)}
                mode={mode}
            >
                {renderTableBody(props, listRef)}
            </Droppable>
        </DragDropContext>
    );
};

/* eslint-disable react/forbid-prop-types */
NonVirtualizedTableBody.propTypes = {
    tableRef: shape({
        current: any,
    }),
    getTableBodyProps: func.isRequired,
    prepareRow: func.isRequired,
    dragDropContext: shape({
        onDragEnd: func,
    }).isRequired,
    getRowId: func.isRequired,
    isCombineEnabled: bool,
    rows: arrayOf(shape({ id: number })),
    RenderClone: elementType,
    maxRowHeight: oneOfType([string, number]),
    rowProps: oneOfType([object, func]),
    renderTableBody: func,
    mode: string,
    // для виртуализированной таблицы
    listRef: shape({
        current: any,
    }),
};

NonVirtualizedTableBody.defaultProps = {
    rows: [],
    isCombineEnabled: false,
    RenderClone: TableRow,
    maxRowHeight: 'auto',
    rowProps: {},
    renderTableBody: RenderTableBody,
};

export default NonVirtualizedTableBody;
