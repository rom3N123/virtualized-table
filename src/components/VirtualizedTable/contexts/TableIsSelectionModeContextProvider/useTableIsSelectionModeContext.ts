import { useContext } from 'react';
import {
	TableIsSelectionModeContext,
	TableSelectionModeContextValue,
} from './TableIsSelectionModeContextProvider';

export const useTableIsSelectionModeContext =
	(): TableSelectionModeContextValue => {
		return useContext(TableIsSelectionModeContext);
	};
