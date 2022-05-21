import { useContext } from 'react';
import {
	TableIsSelectionModeContext,
	TableSelectionModeContextValue,
} from './TableIsSelectionModeContextProvider';

const useTableIsSelectionModeContext = (): TableSelectionModeContextValue => {
	return useContext(TableIsSelectionModeContext);
};

export default useTableIsSelectionModeContext;
