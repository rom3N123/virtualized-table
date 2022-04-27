import React from 'react';
import { func, shape } from 'prop-types';
import Checkbox from '_components/Checkbox';
import useObservable from 'hooks/useObservable';
import { ReactComponent as ArrowUpDownIcon } from 'images/arrows/arrowUpDown2.svg';
import styles from '../../styles/Cells.module.scss';

const VirtualizedTableHeaderSelectCell = ({
    toggleAllRowsSelected,
    isSelectionModeObservable,
    areAllRowsSelectedObservable,
}) => {
    const areAllRowsSelected = useObservable(areAllRowsSelectedObservable);
    const isSelectionMode = useObservable(isSelectionModeObservable);

    return (
        <div className={styles.headerCell}>
            {isSelectionMode ? (
                <Checkbox
                    id="allRowsCheckbox"
                    onChange={toggleAllRowsSelected}
                    checked={areAllRowsSelected}
                />
            ) : (
                <ArrowUpDownIcon className="svg-header" />
            )}
        </div>
    );
};

VirtualizedTableHeaderSelectCell.propTypes = {
    toggleAllRowsSelected: func.isRequired,
    isSelectionModeObservable: shape({
        get: func.isRequired,
        subscribe: func.isRequired,
    }).isRequired,
    areAllRowsSelectedObservable: shape({
        get: func.isRequired,
        subscribe: func.isRequired,
    }).isRequired,
};

export default VirtualizedTableHeaderSelectCell;
