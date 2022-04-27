/* eslint-disable import/no-cycle, consistent-return */
import { ensurePluginOrder } from 'react-table';
import { USE_TABLE_ROW_HIGHLIGHT_PLUGIN_NAME } from '../useTableRowHighlight/useTableRowHighlight';
import { USE_TABLE_ROWS_SELECTION_PLUGIN_NAME } from '../useTableRowsSelection/useTableRowsSelection';
import { USE_TABLE_SELECTION_MODE_PLUGIN_NAME } from '../useTableSelectionMode/useTableSelectionMode';
import { USE_LINK_HIGHLIGHT_ROW_WITH_SELECTION } from './useLinkHighlightRowWithSelection';

const useInstance = (instance) => {
    const {
        rows,
        plugins,
        toggleRowSelected,
        enableTableSelectionMode,
        onHighlightRow,
        previousHighlightedRowIndexRef,
        selectedCacheArrayRef,
        getIsSelectedRow,
        isSelectionModeObservable,
    } = instance;

    ensurePluginOrder(
        plugins,
        [
            USE_TABLE_SELECTION_MODE_PLUGIN_NAME,
            USE_TABLE_ROW_HIGHLIGHT_PLUGIN_NAME,
            USE_TABLE_ROWS_SELECTION_PLUGIN_NAME,
        ],
        USE_LINK_HIGHLIGHT_ROW_WITH_SELECTION
    );

    const handleShiftKeySelect = (index, isSelectionMode) => {
        const row = rows[index];
        const finishIndex = row.index;
        const previousHighlightedRowIndex =
            previousHighlightedRowIndexRef.current;

        if (!isSelectionMode) {
            enableTableSelectionMode();
        }

        let startIndex = 0;

        if (selectedCacheArrayRef.current.value.length) {
            const lastSelectedRow =
                selectedCacheArrayRef.current.value[
                    selectedCacheArrayRef.current.value.length - 1
                ];

            startIndex = lastSelectedRow.index;
        } else if (typeof previousHighlightedRowIndex !== 'undefined') {
            startIndex = previousHighlightedRowIndex;
        }

        if (startIndex < finishIndex) {
            for (let i = startIndex; i <= finishIndex; i++) {
                if (!getIsSelectedRow(rows[i])) {
                    toggleRowSelected(i);
                }
            }
        } else {
            for (let i = startIndex; i >= finishIndex; i--) {
                if (!getIsSelectedRow(rows[i])) {
                    toggleRowSelected(i);
                }
            }
        }
    };

    const keyboardKeyClickHandlerWrapper = (callback) => (index, event) => {
        const isSelectionMode = isSelectionModeObservable.get();
        const { ctrlKey, shiftKey } = event;

        if (shiftKey) {
            return handleShiftKeySelect(index, isSelectionMode);
        }

        if (ctrlKey) {
            if (!isSelectionMode) {
                enableTableSelectionMode();
            }

            return toggleRowSelected(index);
        }

        callback(index, event, isSelectionMode);
    };

    const onHighlightRowWithKeyboardHandler = keyboardKeyClickHandlerWrapper(
        (index, event, isSelectionMode) => {
            if (isSelectionMode) {
                return toggleRowSelected(index);
            }

            onHighlightRow(index);
        }
    );

    const onToggleRowSelectedWithKeyboardHandler = keyboardKeyClickHandlerWrapper(
        toggleRowSelected
    );

    Object.assign(instance, {
        onHighlightRow: onHighlightRowWithKeyboardHandler,
        toggleRowSelected: onToggleRowSelectedWithKeyboardHandler,
    });
};

export default useInstance;
