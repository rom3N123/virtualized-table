const defaultGetRowSelectionProps = (props, { instance }) => {
    const {
        getSelectedRows,
        clearSelectedRows,
        toggleRowSelected,
        toggleAllRowsSelected,
        getIsSelectedRow,
    } = instance;

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

export default defaultGetRowSelectionProps;
