import React, { forwardRef } from 'react';
import {
    arrayOf,
    func,
    number,
    object,
    oneOfType,
    shape,
    string,
} from 'prop-types';
import clsx from 'clsx';
import styles from './TableRow.module.scss';

const TableRow = forwardRef(
    (
        {
            row,
            draggableProps,
            dragHandleProps,
            maxHeight,
            style,
            rows,
            rubric,
            getItemSize,
            className,
            ...otherProps
        },
        ref
    ) => {
        const { getRowProps, cells } = row;

        const rowHeight =
            (typeof getItemSize === 'function'
                ? getItemSize?.(row)
                : getItemSize) || 50;

        const combinedStyle = {
            ...draggableProps?.style,
            ...getRowProps().style,
            height: rowHeight,
            ...style,
            width: 'auto',
            maxHeight,
        };

        return (
            <div
                ref={ref}
                {...draggableProps}
                {...getRowProps()}
                style={combinedStyle}
                className={clsx([styles.row, className])}
                {...otherProps}
            >
                {cells.map((cell) => {
                    const cellProps = cell.getCellProps();
                    const { column } = cell;

                    const props = {
                        ...cellProps,
                        style: {
                            ...cellProps.style,
                            ...column.cellProps?.style,
                        },
                    };

                    return (
                        <div {...props}>
                            {cell.render('Cell', {
                                dragHandleProps,
                            })}
                        </div>
                    );
                })}
            </div>
        );
    }
);

/* eslint-disable react/forbid-prop-types */
TableRow.propTypes = {
    row: shape({
        cells: arrayOf(object),
        getRowProps: func,
    }).isRequired,
    rubric: shape({
        source: shape({
            index: number,
        }),
    }).isRequired,
    maxHeight: oneOfType([number, string]),
    draggableProps: object,
    dragHandleProps: object,
    style: object,
    rows: arrayOf(
        shape({
            id: number,
        })
    ),
    getItemSize: func,
    className: string,
};

TableRow.defaultProps = {
    maxHeight: 'auto',
    style: {},
    rows: [],
    className: '',
};

export default TableRow;
