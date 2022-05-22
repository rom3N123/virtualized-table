import { RowWithProps, FinalTableInstance } from 'react-table';
import { TableLinkHighlightRowWithSelectionInstanceProps } from './useInstance';

export type TableLinkHighlightRowWithSelectionRowProps = Pick<
    TableLinkHighlightRowWithSelectionInstanceProps,
    'onHighlightRow'
>;

const prepareRow = <D extends object>(
    row: RowWithProps<D>,
    { instance }: { instance: FinalTableInstance<D> }
) => {
    row.onHighlightRow = instance.onHighlightRow;
};

export default prepareRow;
