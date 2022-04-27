import React from 'react';
import { rowType } from '_components/common';
import { bool, func } from 'prop-types';
import Checkbox from '_components/Checkbox';

const VirtualizedTableCheckboxCell = ({
    row,
    toggleRowSelected,
    isSelected,
}) => {
    const { index } = row;

    const onCheckboxClick = (event) => {
        event.stopPropagation();
        toggleRowSelected(index, event);
    };

    return (
        <Checkbox
            id={`row-${row.id}`}
            onChange={onCheckboxClick}
            checked={isSelected}
        />
    );
};

/* eslint-disable react/forbid-prop-types */
VirtualizedTableCheckboxCell.propTypes = {
    row: rowType.isRequired,
    toggleRowSelected: func.isRequired,
    isSelected: bool.isRequired,
};

export default VirtualizedTableCheckboxCell;
