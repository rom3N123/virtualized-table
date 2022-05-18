/* eslint-disable import/named, max-len */
import { useState } from 'react';
import { TableInstance } from 'react-table';
import Observable from '../../../../../helpers/Observable';
import { useTableIsSelectionModeContext } from '../../contexts/TableIsSelectionModeContextProvider';

type SelectionModeObservable = Observable<boolean>;

export type TableSelectionModeInstanceProps = {
	enableTableSelectionMode: () => void;
	disableTableSelectionMode: () => void;
	changeTableSelectionMode: () => void;
	isSelectionModeObservable: SelectionModeObservable;
};

const useInstance = (instance: TableInstance) => {
	const [isSelectionModeObservable] = useState<SelectionModeObservable>(
		new Observable<boolean>(false)
	);
	const { setIsSelectionMode } = useTableIsSelectionModeContext() || {};

	const setValue = (value: boolean) => {
		isSelectionModeObservable.set(value);
		setIsSelectionMode?.(value);
	};

	const enableTableSelectionMode = () => {
		setValue(true);
	};

	const disableTableSelectionMode = () => {
		setValue(false);
	};

	const changeTableSelectionMode = isSelectionModeObservable.get()
		? disableTableSelectionMode
		: enableTableSelectionMode;

	Object.assign(instance, {
		enableTableSelectionMode,
		disableTableSelectionMode,
		changeTableSelectionMode,
		isSelectionModeObservable,
	});
};

export default useInstance;
