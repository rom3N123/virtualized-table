/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
import React from 'react';
import {
    arrayOf,
    node,
    bool,
    string,
    oneOfType,
    func,
    oneOf,
} from 'prop-types';
import cellStyles from '_components/Tables/VirtualizedTable/cells/styles/Cells.module.scss';
import styles from './TableCell.module.scss';
import { tableCellDividerClassNameByPosition } from './TableCell.constants';

const TableCell = ({
    isHighlighted,
    classNames,
    children,
    withStopPropagation,
    onClick,
    withGrayBgc,
    divider,
    ...otherProps
}) => {
    const totalClassNames = [
        cellStyles.cell,
        isHighlighted && styles.highlighted,
        withGrayBgc && cellStyles.cell_gray,
        divider && Array.isArray(divider)
            ? divider.reduce(
                  (totalClassName, position) =>
                      `${totalClassName} ${tableCellDividerClassNameByPosition[position]}`,
                  []
              )
            : [tableCellDividerClassNameByPosition[divider]],
    ]
        .concat(typeof classNames === 'string' ? [classNames] : classNames)
        .join(' ');

    const onClickHandler = (event) => {
        if (withStopPropagation) {
            event.stopPropagation();
        }

        if (onClick) {
            onClick(event);
        }
    };

    return (
        <div
            onClick={onClickHandler}
            className={totalClassNames}
            {...otherProps}
        >
            {children}
        </div>
    );
};

TableCell.propTypes = {
    isHighlighted: bool,
    classNames: oneOfType([arrayOf(string), string]),
    children: node,
    withStopPropagation: bool,
    onClick: func,
    withGrayBgc: bool,
    divider: oneOfType([arrayOf(string)], oneOf(['left', 'right'])),
};

TableCell.defaultProps = {
    isHighlighted: false,
    classNames: [],
    children: null,
    withStopPropagation: false,
    withGrayBgc: false,
    divider: '',
};

export default TableCell;
