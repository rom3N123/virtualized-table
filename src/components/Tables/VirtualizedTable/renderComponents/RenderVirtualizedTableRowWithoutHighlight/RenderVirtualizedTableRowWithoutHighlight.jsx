import React, { forwardRef, useImperativeHandle } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { arrayOf, func, number, object, shape, string } from 'prop-types';
import useRenderRowHighlight from '_components/Tables/VirtualizedTable/renderComponents/RenderVirtualizedTableRow/useRenderRowHighlight';
import TableRow from '../../components/TableRow';

const RenderTableRowWithoutHighlight = forwardRef(
    ({ index, style, data }, ref) => {
        const { rows, prepareRow, highlightedRowRef, getRowId } = data;
        const row = rows[index];

        const { original } = row;

        const { isSelected, setIsSelected } = useRenderRowHighlight({
            highlightedRowRef,
            row,
        });

        prepareRow(row);

        useImperativeHandle(ref, () => ({
            row,
            setIsSelected,
        }));

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
                            row={row}
                            renderProps={{
                                isSelected,
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
    }
);

/* eslint-disable react/forbid-prop-types */
RenderTableRowWithoutHighlight.propTypes = {
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
        getRowId: func.isRequired,
    }).isRequired,
    style: object,
};

export default RenderTableRowWithoutHighlight;
