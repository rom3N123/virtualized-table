/* eslint-disable max-len */
import React from 'react';
import { rowType } from '_components/common';
import { bool, func, object } from 'prop-types';
import VirtualizedTableCheckboxCell from '_components/Tables/VirtualizedTable/cells/column/VirtualizedTableCheckboxCell';
import { ReactComponent as DragHandlerIcon } from 'images/dragHandlerIcon.svg';
import TableCell from '_components/Tables/VirtualizedTable/cells/styled/TableCell/TableCell';
import styles from './VirtualizedTableDragHandleCell.module.scss';

const classNames = [styles.cell];

const VirtualizedTableDragHandleCell = ({
    row,
    toggleRowSelected,
    isSelected,
    isHighlighted,
    dragHandleProps,
    withWrapper,
}) => {
    const { getTableSelectionModeProps } = row;

    const { isSelectionMode } = getTableSelectionModeProps();

    const content = isSelectionMode ? (
        <VirtualizedTableCheckboxCell
            row={row}
            isSelected={isSelected}
            toggleRowSelected={toggleRowSelected}
        />
    ) : (
        <div {...dragHandleProps}>
            <DragHandlerIcon />
        </div>
    );

    return withWrapper ? (
        <TableCell isHighlighted={isHighlighted} classNames={classNames}>
            {content}
        </TableCell>
    ) : (
        content
    );
};

/* eslint-disable react/forbid-prop-types */
VirtualizedTableDragHandleCell.propTypes = {
    row: rowType.isRequired,
    toggleRowSelected: func.isRequired,
    isSelected: bool.isRequired,
    isHighlighted: bool.isRequired,
    dragHandleProps: object.isRequired,
    withWrapper: bool,
};

VirtualizedTableDragHandleCell.defaultProps = {
    withWrapper: true,
};

export default VirtualizedTableDragHandleCell;
