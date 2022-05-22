import { ProxyTarget } from './../utils';
import { USE_TABLE_ROW_HIGHLIGHT_PLUGIN_NAME } from './useTableRowHighlight';
import { USE_TABLE_SELECTION_MODE_PLUGIN_NAME } from './../useTableSelectionMode/useTableSelectionMode';
import { useEffect, useRef, MutableRefObject, RefObject } from 'react';
import { ensurePluginOrder, Row } from 'react-table';
import useObservable from '../../../../hooks/useObservable';
import { USE_TABLE_ROWS_SELECTION_PLUGIN_NAME } from '../useTableRowsSelection/useTableRowsSelection';
import { TableInstance } from 'react-table';
import { UseRowsRefsReturn } from '../useTableCore/useInstance/hooks/useRowsRefs/useRowsRefs';
import { TableSelectionModeInstanceProps } from '../useTableSelectionMode/useInstance';
import useHighlightedRowRef from './hooks/useHighlightedRowRef';

export type OnHighlightRowOptions = {
    shouldForceHighlight: boolean;
};

export type TableHighlightInstanceProps<D extends object> = {
    highlightedRowRef: MutableRefObject<ProxyTarget<Row<D> | null>>;
    previousHighlightedRowIdRef: MutableRefObject<string | null>;
    onHighlightRow: (index: number, options?: OnHighlightRowOptions) => void;
    highlightRowById: (rowId: number | string) => void;
};

type Instance<D extends object> = TableInstance<D> &
    UseRowsRefsReturn<D> &
    TableSelectionModeInstanceProps;

function useInstance<D extends object>(instance: Instance<D>): void {
    const { rows, plugins, rowsById, getRowRef, isSelectionModeObservable } = instance;
    const isSelectionMode = useObservable(isSelectionModeObservable);

    const { highlightedRowRef } = useHighlightedRowRef<D>();

    const previousHighlightedRowIdRef: TableHighlightInstanceProps<D>['previousHighlightedRowIdRef'] =
        useRef<string | null>(null);

    ensurePluginOrder(
        plugins,
        [USE_TABLE_SELECTION_MODE_PLUGIN_NAME, USE_TABLE_ROWS_SELECTION_PLUGIN_NAME],
        USE_TABLE_ROW_HIGHLIGHT_PLUGIN_NAME
    );

    const getIsPreviousHighlightedRowExists = () => previousHighlightedRowIdRef.current !== null;

    useEffect(() => {
        if (highlightedRowRef.current?.value) {
            const rowRef = getRowRef(highlightedRowRef.current.value.id);

            rowRef?.current?.setIsHighlighted(false);
            highlightedRowRef.current.value = null;
        }

        if (getIsPreviousHighlightedRowExists()) {
            previousHighlightedRowIdRef.current = null;
        }
    }, [isSelectionMode]);

    const getPreviousHighlightedRowInfo = () => {
        if (getIsPreviousHighlightedRowExists()) {
            const row = rowsById[previousHighlightedRowIdRef.current!];
            const ref = getRowRef(row?.id);

            return {
                previousHighlightedRow: row,
                previousHighlightedRowRef: ref,
            };
        }

        return {};
    };

    const onHighlightRow: TableHighlightInstanceProps<D>['onHighlightRow'] = (
        index,
        options = { shouldForceHighlight: false }
    ) => {
        const row = rows[index];
        const rowRef = getRowRef(row.id);

        const { previousHighlightedRow, previousHighlightedRowRef } =
            getPreviousHighlightedRowInfo();

        if (row.id !== previousHighlightedRow?.id || options.shouldForceHighlight) {
            highlightedRowRef.current!.value = row;

            if (getIsPreviousHighlightedRowExists()) {
                previousHighlightedRowRef?.current?.setIsHighlighted(false);
            }

            rowRef?.current?.setIsHighlighted(true);

            previousHighlightedRowIdRef.current = row.id;
        } else {
            highlightedRowRef.current!.value = null;
            previousHighlightedRowRef?.current?.setIsHighlighted(false);
            previousHighlightedRowIdRef.current = null;
        }
    };

    /**
     * @param {React.ReactText} rowId id строки в instance
     * @param {object} options
     * @param {boolean} options.shouldForceHighlight Если строка уже выделена у неё не будет снято выделение
     */
    const highlightRowById: TableHighlightInstanceProps<D>['highlightRowById'] = (
        rowId,
        options = { shouldForceHighlight: true }
    ) => {
        const row = rowsById[rowId];

        if (row) {
            onHighlightRow(row.index, options);
        }
    };

    const instanceProps: TableHighlightInstanceProps<D> = {
        highlightedRowRef,
        previousHighlightedRowIdRef,
        onHighlightRow,
        highlightRowById,
    };

    Object.assign(instance, instanceProps);
}

export default useInstance;
