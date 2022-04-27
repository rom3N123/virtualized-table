import React from 'react';
import { any, arrayOf, bool, func, number, object, shape } from 'prop-types';
import styles from './TableRow.module.scss';

const TableRow = ({
    innerRef,
    isHighlighted,
    onClick,
    row,
    renderProps,
    ...otherRowProps
}) => {
    const { cells } = row;

    const tableRowClassNames = [styles.row, isHighlighted && 'highlighted']
        .filter(Boolean)
        .join(' ');

    return (
        <tr
            className={tableRowClassNames}
            ref={innerRef}
            onClick={onClick}
            {...otherRowProps}
        >
            {cells.map((cell) => {
                const { getCellProps, render, column } = cell;
                const { width, cellProps } = column;

                return (
                    <td
                        className={styles.rowData}
                        key={column.id}
                        width={width}
                        {...cellProps}
                        {...getCellProps({ style: cellProps?.style })}
                    >
                        {render('Cell', renderProps)}
                    </td>
                );
            })}
        </tr>
    );
};

/* eslint-disable react/forbid-prop-types */
TableRow.propTypes = {
    row: shape({
        cells: arrayOf({
            getCellProps: func.isRequired,
            render: func.isRequired,
            column: shape({
                width: number.isRequired,
                cellProps: object,
            }).isRequired,
        }),
    }).isRequired,
    onClick: func,
    isHighlighted: bool,
    innerRef: shape({
        current: any,
    }),
    renderProps: object,
};

TableRow.defaultProps = {
    isHighlighted: false,
    renderProps: {},
};

export default TableRow;
