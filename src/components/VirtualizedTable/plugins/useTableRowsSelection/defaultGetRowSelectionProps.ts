import { FinalTableInstance, PropGetter } from 'react-table';

export const defaultGetRowSelectionProps: PropGetter<object, object> = (props, { instance }) => {
    const {
        getSelectedRows,
        clearSelectedRows,
        toggleRowSelected,
        toggleAllRowsSelected,
        getIsSelectedRow,
    } = instance as FinalTableInstance<object>;

    return [
        props,
        {
            getSelectedRows,
            clearSelectedRows,
            toggleRowSelected,
            toggleAllRowsSelected,
            getIsSelectedRow,
        },
    ];
};
