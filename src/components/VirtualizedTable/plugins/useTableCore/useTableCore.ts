import { PluginHook } from 'react-table';
import { UseRowsRefsReturn } from './useInstance/hooks/useRowsRefs/useRowsRefs';
import useInstance from './useInstance/useInstance';

export const USE_TABLE_CORE_PLUGIN_NAME = 'useTableCore';

/**
 * Основной плагин, который инициализирует всё необходимое для работы остальных плагинов.
 * Должен инициализироваться первым
 */
const useTableCore: PluginHook = hooks => {
	hooks.useInstance.push(useInstance);
};

useTableCore.pluginName = USE_TABLE_CORE_PLUGIN_NAME;

export default useTableCore;
