import useRowsRefs from './hooks/useRowsRefs';
import { TableInstance } from 'react-table';

const useInstance = (instance: TableInstance<{}>) => {
	const { refs, initializeRef, deleteRef, getRowRef } = useRowsRefs();

	Object.assign(instance, {
		rowsRefs: refs,
		initializeRef,
		deleteRef,
		getRowRef,
	});
};

export default useInstance;
