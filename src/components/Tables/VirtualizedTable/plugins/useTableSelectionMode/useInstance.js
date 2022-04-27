/* eslint-disable import/named, max-len */
import { useState } from 'react';
import Observable from '_helpers/Observable';
import useTableIsSelectionModeContext from '_components/Tables/VirtualizedTable/contexts/TableIsSelectionModeContextProvider/useTableIsSelectionModeContext';

const useInstance = (instance) => {
    const [isSelectionModeObservable] = useState(new Observable(false));
    const { setIsSelectionMode } = useTableIsSelectionModeContext() || {};

    const setValue = (value) => {
        isSelectionModeObservable.set(value);
        setIsSelectionMode?.(value);
    };

    const enableTableSelectionMode = () => {
        setValue(true);
    };

    const disableTableSelectionMode = () => {
        setValue(false);
    };

    const changeTableSelectionMode = isSelectionModeObservable.get()
        ? disableTableSelectionMode
        : enableTableSelectionMode;

    Object.assign(instance, {
        enableTableSelectionMode,
        disableTableSelectionMode,
        changeTableSelectionMode,
        isSelectionModeObservable,
    });
};

export default useInstance;
