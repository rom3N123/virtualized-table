const prepareRow = (row, { instance }) => {
    row.onHighlightRow = instance.onHighlightRow;
};

export default prepareRow;
