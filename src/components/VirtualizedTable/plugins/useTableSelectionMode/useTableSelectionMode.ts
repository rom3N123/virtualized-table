import { PluginHook } from 'react-table';
import defaultGetTableSelectionModeProps from './defaultGetTableSelectionModeProps';
import prepareRow from './prepareRow';
import useInstance from './useInstance';
import { UseTableSelectionModeRowProps } from './prepareRow';

export const USE_TABLE_SELECTION_MODE_PLUGIN_NAME = 'useTableSelectionMode';

const useTableSelectionMode: PluginHook<
	{},
	UseTableSelectionModeRowProps
> = hooks => {
	hooks.getTableSelectionModeProps = [defaultGetTableSelectionModeProps];
	hooks.useInstance.push(useInstance);
	hooks.prepareRow.push(prepareRow);
};

useTableSelectionMode.pluginName = USE_TABLE_SELECTION_MODE_PLUGIN_NAME;

export default useTableSelectionMode;
