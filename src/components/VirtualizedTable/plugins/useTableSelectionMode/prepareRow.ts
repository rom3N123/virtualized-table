import { FinalTableInstance, RowWithProps } from 'react-table';
import { makePropGetter } from 'react-table';

export type UseTableSelectionModeRowProps = {
    getTableSelectionModeProps: () => void;
};

const prepareRow = <D extends object>(
    row: RowWithProps<D>,
    { instance }: { instance: FinalTableInstance<D> }
): void => {
    row.getTableSelectionModeProps = makePropGetter(
        instance.getHooks().getTableSelectionModeProps,
        { instance, row }
    );
};

export default prepareRow;
