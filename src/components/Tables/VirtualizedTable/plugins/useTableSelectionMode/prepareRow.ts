import { PluginPrepareRow } from 'react-table';
import { makePropGetter } from 'react-table';

export type UseTableSelectionModeRowProps = {
	getTableSelectionModeProps: () => void;
};

const prepareRow: PluginPrepareRow<UseTableSelectionModeRowProps> = (
	row,
	{ instance }
): void => {
	row.getTableSelectionModeProps = makePropGetter(
		instance.getHooks().getTableSelectionModeProps,
		{ instance, row }
	);
};

export default prepareRow;
