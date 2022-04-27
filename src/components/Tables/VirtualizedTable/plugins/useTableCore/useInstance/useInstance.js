import useRowsRefs from './hooks/useRowsRefs';

const useInstance = (instance) => {
    const { refs, initializeRef, deleteRef, getRowRef } = useRowsRefs();

    Object.assign(instance, {
        rowsRefs: refs,
        initializeRef,
        deleteRef,
        getRowRef,
    });
};

export default useInstance;
