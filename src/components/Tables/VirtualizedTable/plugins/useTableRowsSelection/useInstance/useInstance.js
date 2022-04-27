/* eslint-disable max-len, guard-for-in, no-restricted-syntax */
import { useEffect, useState } from 'react';
import useObservable from 'hooks/useObservable';
import Observable from '_helpers/Observable';
import { ensurePluginOrder } from 'react-table';
import { USE_TABLE_ROWS_SELECTION_PLUGIN_NAME } from '_components/Tables/VirtualizedTable/plugins/useTableRowsSelection/useTableRowsSelection';
import { USE_TABLE_CORE_PLUGIN_NAME } from '_components/Tables/VirtualizedTable/plugins/useTableCore/useTableCore';
import useSelectedRowsRefs from './hooks/useSelectedRowsRefs/useSelectedRowsRefs';

const useInstance = (instance) => {
    const {
        rows,
        rowsRefs,
        getRowRef,
        plugins,
        isSelectionModeObservable,
        rowsById,
        preselectedRows,
        getRowId,
    } = instance;

    const {
        selectedCacheByIdRef,
        selectedCacheArrayRef,
    } = useSelectedRowsRefs();
    const [areAllRowsSelectedObservable] = useState(new Observable(false));

    const isSelectionMode = useObservable(isSelectionModeObservable);

    ensurePluginOrder(
        plugins,
        [USE_TABLE_CORE_PLUGIN_NAME],
        USE_TABLE_ROWS_SELECTION_PLUGIN_NAME
    );

    useEffect(() => {
        if (preselectedRows?.length) {
            const instanceRows = preselectedRows
                .map((selectedRow) => getRowId(selectedRow))
                .map((rowId) => rowsById[rowId]);

            for (const instanceRow of instanceRows) {
                selectedCacheByIdRef.current[instanceRow.id] = instanceRow;
            }
            selectedCacheArrayRef.current.value = [
                ...instanceRows,
                ...selectedCacheArrayRef.current.value,
            ];
        }
    }, [preselectedRows]);

    const clearSelectedRows = () => {
        for (const rowId in rowsRefs.current) {
            const {
                current: { setIsSelected },
            } = getRowRef(rowId);

            setIsSelected(false);
        }

        selectedCacheByIdRef.current = {};

        selectedCacheArrayRef.current.value = [];

        areAllRowsSelectedObservable.set(false);
    };

    const toggleRowSelected = (index) => {
        const row = rows[index];
        const { id } = row;
        const isSelected = Boolean(selectedCacheByIdRef.current[id]);
        const rowRef = getRowRef(id);

        rowRef?.current?.setIsSelected((prevState) => !prevState);

        if (isSelected) {
            delete selectedCacheByIdRef.current[id];

            selectedCacheArrayRef.current.value = selectedCacheArrayRef.current.value.filter(
                (row) => row.id !== id
            );

            if (areAllRowsSelectedObservable.get()) {
                areAllRowsSelectedObservable.set(false);
            }
        } else {
            selectedCacheArrayRef.current.value = [
                ...selectedCacheArrayRef.current.value,
                row,
            ];
            selectedCacheByIdRef.current[id] = row;

            if (selectedCacheArrayRef.current.value.length === rows.length) {
                areAllRowsSelectedObservable.set(true);
            }
        }
    };

    const toggleAllRowsSelected = () => {
        if (selectedCacheArrayRef.current.value.length !== rows.length) {
            for (const rowId in rowsRefs.current) {
                const {
                    current: { setIsSelected },
                } = getRowRef(rowId);

                setIsSelected(true);
            }

            selectedCacheByIdRef.current = rowsById;
            selectedCacheArrayRef.current.value = rows;

            areAllRowsSelectedObservable.set(true);
        } else {
            clearSelectedRows();
        }
    };

    const getIsSelectedRow = ({ id }) =>
        Boolean(selectedCacheByIdRef.current[id]);

    useEffect(() => {
        if (
            !isSelectionMode &&
            selectedCacheArrayRef.current.value.length &&
            !preselectedRows?.length
        ) {
            clearSelectedRows();
        }
    }, [isSelectionMode]);

    Object.assign(instance, {
        areAllRowsSelectedObservable,
        selectedCacheById: selectedCacheByIdRef.current,
        selectedCacheArrayRef,
        toggleRowSelected,
        toggleAllRowsSelected,
        getIsSelectedRow,
        clearSelectedRows,
    });
};

export default useInstance;
