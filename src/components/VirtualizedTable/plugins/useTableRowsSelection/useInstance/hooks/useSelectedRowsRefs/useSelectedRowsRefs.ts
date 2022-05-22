import { Row } from 'react-table';
import { useRef } from 'react';
import { useTableIsSomeRowsSelectedContext } from '../../../../../contexts/TableIsSomeRowsSelectedContextProvider';

import { combineFunctions, getProxiedArray, ProxyTarget } from './../../../../utils';
import { useTableRowsSelectionContext } from '../../../../../contexts/TableRowsSelectionContextProvider';

const useSelectedRowsRefs = <D extends object>() => {
    const { setSelectedRows } = useTableRowsSelectionContext() || {};
    const { setIsSomeRowsSelected } = useTableIsSomeRowsSelectedContext() || {};

    const selectedCacheByIdRef = useRef<Record<string, Row<D>>>({});

    const selectedCacheArrayRef = useRef<ProxyTarget<string[]>>(
        getProxiedArray({ value: [] }, combineFunctions(setSelectedRows, setIsSomeRowsSelected))
    );

    return {
        selectedCacheByIdRef,
        selectedCacheArrayRef,
    };
};

export default useSelectedRowsRefs;
