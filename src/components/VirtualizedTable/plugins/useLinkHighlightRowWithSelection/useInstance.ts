import { TableInstanceWithProps, ensurePluginOrder } from 'react-table';
import { TableHighlightInstanceProps } from './..';
import {
    USE_TABLE_ROW_HIGHLIGHT_PLUGIN_NAME,
    USE_TABLE_ROWS_SELECTION_PLUGIN_NAME,
    USE_TABLE_SELECTION_MODE_PLUGIN_NAME,
    USE_LINK_HIGHLIGHT_ROW_WITH_SELECTION,
} from '..';
import { MouseEvent } from 'react';
import { TableRowsSelectionInstanceProps } from '../useTableRowsSelection/useInstance';
import { TableSelectionModeInstanceProps } from '../useTableSelectionMode/useInstance';

type AnyCb = (...args: any[]) => any;

export type TableLinkHighlightRowWithSelectionInstance<D extends object> =
    TableSelectionModeInstanceProps &
        TableHighlightInstanceProps<D> &
        TableRowsSelectionInstanceProps<D> & {
            shouldForceHighlight?: boolean;
        };

type OnRowClick = (index: number, event: MouseEvent) => void;
type KeyboardClickWrapper = (cb: AnyCb) => OnRowClick;

export type TableLinkHighlightRowWithSelectionInstanceProps = {
    onHighlightRow: OnRowClick;
    toggleRowSelected: OnRowClick;
};

export const useInstance = <D extends object>(
    instance: TableInstanceWithProps<D, TableLinkHighlightRowWithSelectionInstance<D>>,
) => {
    const {
        rows,
        plugins,
        toggleRowSelected,
        enableTableSelectionMode,
        onHighlightRow,
        previousHighlightedRowIdRef,
        selectedCacheArrayRef,
        getIsSelectedRow,
        isSelectionModeObservable,
        shouldForceHighlight = false,
        rowsById,
    } = instance;

    ensurePluginOrder(
        plugins,
        [
            USE_TABLE_SELECTION_MODE_PLUGIN_NAME,
            USE_TABLE_ROW_HIGHLIGHT_PLUGIN_NAME,
            USE_TABLE_ROWS_SELECTION_PLUGIN_NAME,
        ],
        USE_LINK_HIGHLIGHT_ROW_WITH_SELECTION,
    );

    const handleShiftKeySelect = (index: number, isSelectionMode: boolean) => {
        const row = rows[index];
        const finishIndex = row.index;
        const previousHighlightedRowId = previousHighlightedRowIdRef.current;
        const previousHighlightedRow = rowsById[previousHighlightedRowId!];

        if (!isSelectionMode) {
            enableTableSelectionMode();
        }

        let startIndex = 0;

        if (selectedCacheArrayRef.current?.value.length) {
            const lastSelectedRowId =
                selectedCacheArrayRef.current.value[selectedCacheArrayRef.current.value.length - 1];

            startIndex = rowsById[lastSelectedRowId].index;
        } else if (typeof previousHighlightedRow !== 'undefined') {
            startIndex = previousHighlightedRow.index;
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

    const keyboardKeyClickHandlerWrapper: KeyboardClickWrapper = (callback) => (index, event) => {
        const isSelectionMode = isSelectionModeObservable.get();
        const { ctrlKey, shiftKey } = event || {};

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

            onHighlightRow(index, { shouldForceHighlight });
        },
    );

    const onToggleRowSelectedWithKeyboardHandler = keyboardKeyClickHandlerWrapper(
        (index: number) => {
            if (!isSelectionModeObservable.get()) {
                enableTableSelectionMode();
            }

            toggleRowSelected(index);
        },
    );

    const instanceProps: TableLinkHighlightRowWithSelectionInstanceProps = {
        onHighlightRow: onHighlightRowWithKeyboardHandler,
        toggleRowSelected: onToggleRowSelectedWithKeyboardHandler,
    };

    Object.assign(instance, instanceProps);
};
