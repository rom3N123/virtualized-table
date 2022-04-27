/* eslint-disable max-len */
import defaultGetTableSelectionModeProps from '_components/Tables/VirtualizedTable/plugins/useTableSelectionMode/defaultGetTableSelectionModeProps';
import prepareRow from './prepareRow';
import useInstance from './useInstance';

export const USE_TABLE_SELECTION_MODE_PLUGIN_NAME = 'useTableSelectionMode';

/**
 * Хук для режима выделения в таблице
 */
const useTableSelectionMode = (hooks) => {
    hooks.getTableSelectionModeProps = [defaultGetTableSelectionModeProps];
    hooks.useInstance.push(useInstance);
    hooks.prepareRow.push(prepareRow);
};

useTableSelectionMode.pluginName = USE_TABLE_SELECTION_MODE_PLUGIN_NAME;

export default useTableSelectionMode;
