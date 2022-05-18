import { PluginHook } from 'react-table';
/* eslint-disable import/no-cycle */
import prepareRow from './prepareRow';
import useInstance from './useInstance';

export const USE_TABLE_ROW_HIGHLIGHT_PLUGIN_NAME = 'useTableRowHighlight';

/**
 * Хук для выделения строки в таблице
 */
const useTableRowHighlight: PluginHook<{}, {}> = hooks => {
	hooks.useInstance.push(useInstance);
	hooks.prepareRow.push(prepareRow);
};

useTableRowHighlight.pluginName = USE_TABLE_ROW_HIGHLIGHT_PLUGIN_NAME;

export default useTableRowHighlight;
