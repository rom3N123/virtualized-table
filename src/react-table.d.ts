import { DraggableProvided } from 'react-beautiful-dnd';
import {
    TableCoreInstanceProps,
    TableSelectionModeRowProps,
    TableHighlightInstanceProps,
    TableRowsSelectionInstanceProps,
    TableSelectionModeInstanceProps,
    TableLinkHighlightRowWithSelectionInstanceProps,
    TableRowsSelectionRowProps,
    TableLinkHighlightRowWithSelectionRowProps,
} from './components/VirtualizedTable/plugins';
import {FinalCellProps, CustomColumnProps} from './sharedTypes'

declare module 'react-table' {
    export interface TableOptions<D extends object>
        extends UseExpandedOptions<D>,
            UseSortByColumnOptions<D> {}

    export type GetRowId<D extends object> = UseTableOptions<D>['getRowId'];
    export type GetTableBodyProps<D extends object> = UseTableInstanceProps<D>['getTableBodyProps'];
    export type UseTableRows<D extends object> = UseTableInstanceProps<D>['rows'];
    export type PrepareRow<D extends object> = UseTableInstanceProps<D>['prepareRow'];

    export type TableInstanceWithProps<D extends object, P extends object> = TableInstance<D> & P;

    export type FinalTableInstance<
        D extends object,
        E extends object = {},
    > = TableInstanceWithProps<
        D,
        TableCoreInstanceProps<D> &
            TableHighlightInstanceProps<D> &
            TableRowsSelectionInstanceProps<D> &
            TableSelectionModeInstanceProps &
            TableLinkHighlightRowWithSelectionInstanceProps &
            E
    >;

    // export interface TableInstance<D extends object> extends FinalTableInstance<D> {}

    export type RowCellRenderProps = {
        isSelected: boolean;
        isHighlighted: boolean;
        draggableProps: DraggableProvided['draggableProps'];
        dragHandleProps: DraggableProvided['dragHandleProps'];
    };

    export type TableColumnInterfaceBasedOnValue<D extends object = {}, V = any> = {
        Cell?: Renderer<FinalCellProps<D, V>> | undefined;
    };

    export type RowWithProps<D extends object, P extends object = {}> = Row<D> &
        TableRowsSelectionRowProps<D> &
        TableLinkHighlightRowWithSelectionRowProps;

    export interface Hooks<D extends object, P extends object = {}> {
        useInstance: Array<(instance: TableInstanceWithProps<D, P>) => void>;
        prepareRow: Array<
            (
                row: RowWithProps<D, any>,
                meta: Meta<D> & { instance: TableInstanceWithProps<D, any> },
            ) => void
        >;
    }

    export interface TableRowProps extends TableCommonProps, TableSelectionModeRowProps {}

    export interface UseTableHooks<D extends object> extends Record<string, any> {
        useInstance: Array<(instance: TableInstance<D>) => void>;
    }

    export interface UseTableColumnProps<D extends object>
        extends UseResizeColumnsColumnProps<D>,
            UseSortByColumnProps<D>,
            CustomColumnProps {}
}
