/* eslint-disable import/no-cycle, max-len */
import { useRef, useEffect, useCallback } from 'react';
import { ensurePluginOrder } from 'react-table';
import useObservable from 'hooks/useObservable';
import useHighlightedRowRef from '_components/Tables/VirtualizedTable/plugins/useTableRowHighlight/hooks/useHighlightedRowRef';
import { USE_TABLE_ROWS_SELECTION_PLUGIN_NAME } from '../useTableRowsSelection/useTableRowsSelection';
import { USE_TABLE_SELECTION_MODE_PLUGIN_NAME } from '../useTableSelectionMode/useTableSelectionMode';
import { USE_TABLE_ROW_HIGHLIGHT_PLUGIN_NAME } from './useTableRowHighlight';

const useInstance = (instance) => {
    const { rows, plugins, getRowRef, isSelectionModeObservable } = instance;

    const isSelectionMode = useObservable(isSelectionModeObservable);

    const { highlightedRowRef } = useHighlightedRowRef();

    const previousHighlightedRowIndexRef = useRef();

    ensurePluginOrder(
        plugins,
        [
            USE_TABLE_SELECTION_MODE_PLUGIN_NAME,
            USE_TABLE_ROWS_SELECTION_PLUGIN_NAME,
        ],
        USE_TABLE_ROW_HIGHLIGHT_PLUGIN_NAME
    );

    const getIsValidPreviousRowIndex = () =>
        typeof previousHighlightedRowIndexRef.current !== 'undefined';

    useEffect(() => {
        if (highlightedRowRef.current.value) {
            const highlightedRow = rows[highlightedRowRef.current.value.index];
            const rowRef = getRowRef(highlightedRow.id);

            rowRef.current?.setIsHighlighted(false);
            highlightedRowRef.current.value = null;
        }

        if (getIsValidPreviousRowIndex()) {
            previousHighlightedRowIndexRef.current = undefined;
        }
    }, [isSelectionMode]);

    const onHighlightRow = useCallback(
        (index) => {
            const row = rows[index];
            const rowRef = getRowRef(row.id);

            const previousHighlightedRowIndex =
                previousHighlightedRowIndexRef.current;
            const previousHighlightedRow = rows[previousHighlightedRowIndex];
            const previousHighlightedRowRef = getRowRef(
                previousHighlightedRow?.id
            );

            if (index !== previousHighlightedRowIndex) {
                highlightedRowRef.current.value = row;

                if (getIsValidPreviousRowIndex()) {
                    previousHighlightedRowRef?.current?.setIsHighlighted(false);
                }

                rowRef.current?.setIsHighlighted(true);

                previousHighlightedRowIndexRef.current = index;
            } else {
                highlightedRowRef.current.value = null;
                previousHighlightedRowRef.current?.setIsHighlighted(false);
                previousHighlightedRowIndexRef.current = undefined;
            }
        },
        [rows]
    );

    Object.assign(instance, {
        highlightedRowRef,
        previousHighlightedRowIndexRef,
        onHighlightRow,
    });
};

export default useInstance;
