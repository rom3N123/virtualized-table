/* eslint-disable max-len */
import { useContext } from 'react';
import { TableIsSelectionModeContext } from './TableIsSelectionModeContextProvider';

const useTableIsSelectionModeContext = () => {
    return useContext(TableIsSelectionModeContext);
};

export default useTableIsSelectionModeContext;
