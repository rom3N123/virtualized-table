import { Hooks } from 'react-table';
import { prepareRow, defaultGetRowSelectionProps } from '.';
import { TableRowsSelectionUseInstanceProps, useInstance } from './useInstance';

export const USE_TABLE_ROWS_SELECTION_PLUGIN_NAME = 'useTableRowsSelection';

/**
 * Хук для выделения строк в таблице
 */
const useTableRowsSelection = <D extends object>(
    hooks: Hooks<D, TableRowsSelectionUseInstanceProps<D>>,
) => {
    hooks.getRowSelectionProps = [defaultGetRowSelectionProps];
    hooks.useInstance.push(useInstance);
    hooks.prepareRow.push(prepareRow);
};

useTableRowsSelection.pluginName = USE_TABLE_ROWS_SELECTION_PLUGIN_NAME;

export { useTableRowsSelection };
