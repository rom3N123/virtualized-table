/* eslint-disable import/no-cycle */
import useInstance from './useInstance';
import prepareRow from './prepareRow';

export const USE_LINK_HIGHLIGHT_ROW_WITH_SELECTION =
    'useLinkHighlightRowWithSelection';

/**
 * Хук для связи выделения таблицы с кнопками CTRL/SHIFT
 */
const useLinkHighlightRowWithSelection = (hooks) => {
    const { stateReducers } = hooks;

    if (stateReducers) {
        hooks.useInstance.push(useInstance);
        hooks.prepareRow.push(prepareRow);
    }
};

useLinkHighlightRowWithSelection.pluginName = USE_LINK_HIGHLIGHT_ROW_WITH_SELECTION;

export default useLinkHighlightRowWithSelection;
