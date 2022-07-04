import { useRowsRefs, UseRowsRefsReturn } from './hooks';
import { TableInstance } from 'react-table';

export type TableCoreInstanceProps<D extends object> = UseRowsRefsReturn<D>;

const useInstance = <D extends object>(instance: TableInstance<D>) => {
    const { refs, initializeRef, deleteRef, getRowRef } = useRowsRefs<D>();

    Object.assign(instance, {
        rowsRefs: refs,
        initializeRef,
        deleteRef,
        getRowRef,
    });
};

export default useInstance;
