import React from 'react';
import { arrayOf, bool, node, number, oneOfType, string } from 'prop-types';
import TableCell from '_components/Tables/VirtualizedTable/cells/styled/TableCell';
import cellStyles from '_components/Tables/VirtualizedTable/cells/styles/Cells.module.scss';
import styles from './TableCellWithStartAlign.module.scss';

const TableCellWithStartAlign = ({
    conditionToStartAlign,
    height,
    children,
    classNames,
    containerClassName,
    isHighlighted,
    ...otherProps
}) => {
    const contentClassNames = [
        styles.container,
        cellStyles.cell_withoutShadow,
        containerClassName,
    ].join(' ');

    const content = conditionToStartAlign ? (
        <div className={contentClassNames} style={{ height, width: '100%' }}>
            {children}
        </div>
    ) : (
        children
    );

    const totalClassNames = [conditionToStartAlign && styles.alignStart].concat(
        typeof classNames === 'string' ? [classNames] : classNames
    );

    return (
        <TableCell
            isHighlighted={isHighlighted}
            {...otherProps}
            classNames={totalClassNames}
        >
            {content}
        </TableCell>
    );
};

TableCellWithStartAlign.propTypes = {
    isHighlighted: bool,
    height: number,
    conditionToStartAlign: bool,
    children: node,
    classNames: oneOfType([arrayOf(string), string]),
    containerClassName: string,
};

TableCellWithStartAlign.defaultProps = {
    isHighlighted: false,
    conditionToStartAlign: false,
    height: 70,
    children: null,
    classNames: '',
    containerClassName: '',
};

export default TableCellWithStartAlign;
