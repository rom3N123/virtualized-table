import defaultGetRowSelectionProps from './defaultGetRowSelectionProps';
import prepareRow from './prepareRow';
import useInstance from './useInstance';

export const USE_TABLE_ROWS_SELECTION_PLUGIN_NAME = 'useTableRowsSelection';

/**
 * Хук для выделения строк в таблице
 */
const useTableRowsSelection = (hooks) => {
    hooks.getRowSelectionProps = [defaultGetRowSelectionProps];
    hooks.useInstance.push(useInstance);
    hooks.prepareRow.push(prepareRow);
};

useTableRowsSelection.pluginName = USE_TABLE_ROWS_SELECTION_PLUGIN_NAME;

export default useTableRowsSelection;
