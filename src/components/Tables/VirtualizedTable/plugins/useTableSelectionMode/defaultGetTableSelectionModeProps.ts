import { RowPropGetter, TableInstance } from 'react-table';
import useObservable from '../../../../../hooks/useObservable';
import { UseTableSelectionModeInstanceProps } from './useInstance';

export type TableSelectionModeRowProps = UseTableSelectionModeInstanceProps & {
	isSelectionMode: boolean;
};

const defaultGetTableSelectionModeProps: RowPropGetter<{}> = (
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
