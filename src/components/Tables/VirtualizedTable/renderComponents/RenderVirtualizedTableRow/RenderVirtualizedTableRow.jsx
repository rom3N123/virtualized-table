import React, { forwardRef, useImperativeHandle } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import {
    arrayOf,
    elementType,
    func,
    number,
    object,
    shape,
    string,
} from 'prop-types';
import useRenderRowHighlight from './useRenderRowHighlight';
import TableRow from '../../components/TableRow';

const RenderTableRow = forwardRef(({ index, style, data }, ref) => {
    const {
        rows,
        prepareRow,
        highlightedRowRef,
        isItemLoaded,
        getRowId,
        ItemLoader,
    } = data;
    const row = rows[index];

    const isLoaded = isItemLoaded(index);

    if (!isLoaded) {
        return <ItemLoader index={index} style={style} data={data} />;
    }

    const { original } = row;

    const {
        isSelected,
        setIsSelected,
        isHighlighted,
        setIsHighlighted,
    } = useRenderRowHighlight({
        highlightedRowRef,
        row,
    });

    const isHighlightedOrSelected = isHighlighted || isSelected;

    prepareRow(row);

    useImperativeHandle(ref, () => ({
        row,
        isSelected,
        setIsSelected,
        setIsHighlighted,
    }));

    const onHighlightRowHandler = (event) => {
        row.onHighlightRow(index, event);
    };

    const draggableId = getRowId(original);

    return (
        <Draggable draggableId={draggableId} index={index}>
            {({ innerRef, draggableProps, dragHandleProps }) => {
                const {
                    style: draggableStyles,
                    ...otherDraggableProps
                } = draggableProps;

                return (
                    <TableRow
                        innerRef={innerRef}
                        isHighlighted={isHighlightedOrSelected}
                        onClick={onHighlightRowHandler}
                        row={row}
                        renderProps={{
                            isSelected,
                            isHighlighted: isHighlightedOrSelected,
                            draggableProps,
                            dragHandleProps,
                            ...data,
                        }}
                        {...otherDraggableProps}
                        {...row.getRowProps({
                            style: {
                                ...style,
                                ...draggableStyles,
                            },
                        })}
                    />
                );
            }}
        </Draggable>
    );
});

/* eslint-disable react/forbid-prop-types */
RenderTableRow.propTypes = {
    getRowId: func.isRequired,
    index: number.isRequired,
    data: shape({
        rows: arrayOf(
            shape({
                id: string,
            })
        ),
        getItemSize: func.isRequired,
        prepareRow: func.isRequired,
        highlightedRowRef: shape({
            current: shape({
                id: string,
            }),
        }),
        ItemLoader: elementType.isRequired,
        getRowId: func.isRequired,
    }).isRequired,
    style: object,
};

export default RenderTableRow;
