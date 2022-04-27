import { makePropGetter } from 'react-table';

const prepareRow = (row, { instance }) => {
    row.getTableSelectionModeProps = makePropGetter(
        instance.getHooks().getTableSelectionModeProps,
        { instance, row }
    );
};

export default prepareRow;
