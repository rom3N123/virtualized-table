import { Hooks } from 'react-table';
import defaultGetTableSelectionModeProps from './defaultGetTableSelectionModeProps';
import prepareRow from './prepareRow';
import useInstance from './useInstance';

export const USE_TABLE_SELECTION_MODE_PLUGIN_NAME = 'useTableSelectionMode';

const useTableSelectionMode = <D extends object>(hooks: Hooks<D>) => {
    hooks.getTableSelectionModeProps = [defaultGetTableSelectionModeProps];
    hooks.useInstance.push(useInstance);
    hooks.prepareRow.push(prepareRow);
};

useTableSelectionMode.pluginName = USE_TABLE_SELECTION_MODE_PLUGIN_NAME;

export default useTableSelectionMode;
