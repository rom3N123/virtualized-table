/* eslint-disable max-len */
import React from 'react';
import VirtualizedTableDragHandleCell from '_components/Tables/VirtualizedTable/cells/column/VirtualizedTableDragHandleCell/VirtualizedTableDragHandleCell';
import TableCellWithStartAlign from '_components/Tables/VirtualizedTable/cells/styled/TableCellWithStartAlign';
import { bool, number, string } from 'prop-types';
import styles from './VirtualizedTableDragHandleCell.module.scss';

const VirtualizedTableDragHandleCellAlignStart = (props) => {
    const { isHighlighted, conditionToStartAlign, height, className } = props;

    const containerClassName = [
        styles.cell,
        styles.cell_borderless,
        isHighlighted && styles.highlighted,
    ].join(' ');

    const totalClassNames = [
        styles.cell,
        isHighlighted && styles.highlighted,
        className,
    ];

    return (
        <TableCellWithStartAlign
            isHighlighted={isHighlighted}
            conditionToStartAlign={conditionToStartAlign}
            classNames={totalClassNames}
            height={height}
            containerClassName={containerClassName}
        >
            <VirtualizedTableDragHandleCell withWrapper={false} {...props} />
        </TableCellWithStartAlign>
    );
};

VirtualizedTableDragHandleCellAlignStart.propTypes = {
    isHighlighted: bool.isRequired,
    height: number,
    conditionToStartAlign: bool,
    className: string,
};

VirtualizedTableDragHandleCellAlignStart.defaultProps = {
    conditionToStartAlign: false,
    height: 70,
    className: '',
};

export default VirtualizedTableDragHandleCellAlignStart;
