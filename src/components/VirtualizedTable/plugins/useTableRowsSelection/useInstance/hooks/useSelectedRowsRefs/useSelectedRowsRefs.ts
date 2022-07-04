import { Row } from 'react-table';
import { useRef } from 'react';
import {
    useTableIsSomeRowsSelectedContext,
    useTableRowsSelectionContext,
} from '../../../../../contexts';
import { combineFunctions, getProxiedArray, ProxyTarget } from './../../../../utils';

export const useSelectedRowsRefs = <D extends object>() => {
    const { setSelectedRows } = useTableRowsSelectionContext() || {};
    const { setIsSomeRowsSelected } = useTableIsSomeRowsSelectedContext() || {};

    const selectedCacheByIdRef = useRef<Record<string, Row<D>>>({});

    const selectedCacheArrayRef = useRef<ProxyTarget<string[]>>(
        getProxiedArray({ value: [] }, combineFunctions(setSelectedRows, setIsSomeRowsSelected)),
    );

    return {
        selectedCacheByIdRef,
        selectedCacheArrayRef,
    };
};
