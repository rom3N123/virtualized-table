import { Hooks } from 'react-table';
import useInstance from './useInstance/useInstance';

export const USE_TABLE_CORE_PLUGIN_NAME = 'useTableCore';

/**
 * Основной плагин, который инициализирует всё необходимое для работы остальных плагинов.
 * Должен инициализироваться первым
 */
const useTableCore = <D extends object>(hooks: Hooks<D, any>) => {
	hooks.useInstance.push(useInstance);
};

useTableCore.pluginName = USE_TABLE_CORE_PLUGIN_NAME;

export { useTableCore };
