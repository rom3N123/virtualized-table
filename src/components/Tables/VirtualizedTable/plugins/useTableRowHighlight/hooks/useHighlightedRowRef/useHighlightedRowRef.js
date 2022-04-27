/* eslint-disable max-len */
import { useRef } from 'react';
import { getProxiedObject } from '_components/Tables/VirtualizedTable/plugins/utils';
import useTableHighlightedRowContext from '_components/Tables/VirtualizedTable/contexts/TableHighlightedRowContextProvider/useTableHighlightedRowContext';

const useHighlightedRowRef = () => {
    const { setHighlightedRow } = useTableHighlightedRowContext() || {};

    const highlightedRowRef = useRef(
        getProxiedObject({ value: null }, setHighlightedRow)
    );

    return {
        highlightedRowRef,
    };
};

export default useHighlightedRowRef;
