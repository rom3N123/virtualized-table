/* eslint-disable max-len */
import { useRef } from 'react';
import useTableRowsSelectionContext from '_components/Tables/VirtualizedTable/contexts/TableRowsSelectionContextProvider/useTableRowsSelectionContext';
import useTableIsSomeRowsSelectedContext from '_components/Tables/VirtualizedTable/contexts/TableIsSomeRowsSelectedContextProvider/useTableIsSomeRowsSelectedContext';
import {
    combineFunctions,
    getProxiedArray,
} from '_components/Tables/VirtualizedTable/plugins/utils';

const useSelectedRowsRefs = () => {
    const { setSelectedRows } = useTableRowsSelectionContext() || {};
    const { setIsSomeRowsSelected } = useTableIsSomeRowsSelectedContext() || {};

    const selectedCacheByIdRef = useRef({});

    const selectedCacheArrayRef = useRef(
        getProxiedArray(
            { value: [] },
            combineFunctions(setSelectedRows, setIsSomeRowsSelected)
        )
    );

    return {
        selectedCacheByIdRef,
        selectedCacheArrayRef,
    };
};

export default useSelectedRowsRefs;
