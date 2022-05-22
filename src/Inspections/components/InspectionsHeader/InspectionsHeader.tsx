import React, { FC, ReactElement } from 'react';
import { useTableIsSelectionModeContext } from '../../../components/VirtualizedTable/contexts/TableIsSelectionModeContextProvider';
import { useTableRowsSelectionContext } from '../../../components/VirtualizedTable/contexts/TableRowsSelectionContextProvider';
import styles from './style.module.css';

const InspectionsHeader: FC = (): ReactElement => {
	const { isSelectionMode } = useTableIsSelectionModeContext();
	const { selectedRows } = useTableRowsSelectionContext();

	console.log(selectedRows);

	return (
		<div className={styles.header}>
			<div className='buttons'>
				<button>{isSelectionMode ? 'Выключить' : 'Включить'}</button>
			</div>
		</div>
	);
};

export default InspectionsHeader;
