import { UseRowsRefsReturn } from './hooks/useRowsRefs/useRowsRefs';
import useRowsRefs from './hooks/useRowsRefs';
import { TableInstance } from 'react-table';

export type UseTableCoreInstanceProps = UseRowsRefsReturn;

const useInstance = (instance: TableInstance) => {
	const { refs, initializeRef, deleteRef, getRowRef } = useRowsRefs();

	Object.assign(instance, {
		rowsRefs: refs,
		initializeRef,
		deleteRef,
		getRowRef,
	});
};

export default useInstance;
