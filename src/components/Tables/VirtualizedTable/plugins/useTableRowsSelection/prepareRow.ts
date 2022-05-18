const prepareRow = (row, { instance }) => {
    row.getIsSelectedRow = instance.getIsSelectedRow;
    row.getSelectedRows = instance.getSelectedRows;
    row.clearSelectedRows = instance.clearSelectedRows;
    row.toggleRowSelected = instance.toggleRowSelected;
    row.toggleAllRowsSelected = instance.toggleAllRowsSelected;
    row.rowsRefs = instance.rowsRefs;
};

export default prepareRow;
