import { TableSelectionModeInstanceProps } from './useInstance';
import { TableInstance, PropGetter } from 'react-table';
import useObservable from '../../../../hooks/useObservable';

export type TableSelectionModeRowProps = TableSelectionModeInstanceProps & {
	isSelectionMode: boolean;
};

const defaultGetTableSelectionModeProps: PropGetter<object, object> = (
	props,
	{ instance }
) => {
	const {
		enableTableSelectionMode,
		disableTableSelectionMode,
		changeTableSelectionMode,
		isSelectionModeObservable,
	} = instance as TableInstance & TableSelectionModeRowProps;

	const isSelectionMode = useObservable(isSelectionModeObservable);

	return [
		props,
		{
			enableTableSelectionMode,
			disableTableSelectionMode,
			changeTableSelectionMode,
			isSelectionModeObservable,
			isSelectionMode,
		},
	];
};

export default defaultGetTableSelectionModeProps;