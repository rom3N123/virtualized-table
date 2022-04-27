import { useRef, createRef } from 'react';

const useRowsRefs = () => {
    const refs = useRef({});

    const getRowRef = (rowId) => refs.current[rowId];

    const initializeRef = (rowId) => {
        const existingRef = getRowRef(rowId);

        if (existingRef) {
            return existingRef;
        }

        refs.current[rowId] = createRef();

        return refs.current[rowId];
    };

    const deleteRef = (rowId) => {
        delete refs.current[rowId];
    };

    return {
        refs,
        initializeRef,
        deleteRef,
        getRowRef,
    };
};

export default useRowsRefs;
