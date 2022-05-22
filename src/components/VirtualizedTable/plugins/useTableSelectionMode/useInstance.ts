import { useState } from 'react';
import { TableInstance } from 'react-table';
import { Observable } from '../../../../helpers';
import { useTableIsSelectionModeContext } from '../../contexts/TableIsSelectionModeContextProvider';

type SelectionModeObservable = Observable<boolean>;

export type TableSelectionModeInstanceProps = {
	enableTableSelectionMode: () => void;
	disableTableSelectionMode: () => void;
	changeTableSelectionMode: () => void;
	isSelectionModeObservable: SelectionModeObservable;
};

export const useInstance = <D extends object>(instance: TableInstance<D>) => {
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

	const instanceProps: TableSelectionModeInstanceProps = {
		enableTableSelectionMode,
		disableTableSelectionMode,
		changeTableSelectionMode,
		isSelectionModeObservable,
	};

	Object.assign(instance, instanceProps);
};
