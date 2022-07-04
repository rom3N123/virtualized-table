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

declare module 'react-table' {
    export interface TableOptions<D extends object>
        extends UseExpandedOptions<D>,
            UseSortByColumnOptions<D> {}

    export type GetRowId<D extends object> = UseTableOptions<D>['getRowId'];
    export type GetTableBodyProps = UseTableInstanceProps['getTableBodyProps'];
    export type UseTableRows<D extends object> = UseTableInstanceProps<D>['rows'];
    export type PrepareRow = UseTableInstanceProps['prepareRow'];

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

    export type RowCellRenderProps = {
        isSelected: boolean;
        isHighlighted: boolean;
        draggableProps: DraggableProvided['draggableProps'];
        dragHandleProps: DraggableProvided['dragHandleProps'];
    };

    export type FinalCellProps<
        D extends object,
        V = any,
        E extends object = {},
    > = FinalTableInstance<D, E> & {
        column: ColumnInstance<D>;
        row: Row<D>;
        cell: Cell<D, V>;
        value: CellValue<V>;
    };

    export type TableColumnInterfaceBasedOnValue<D extends object = {}, V = any> = {
        Cell?: Renderer<FinalCellProps<D, V>> | undefined;
    };

    export type RowWithProps<D extends object, P extends object = {}> = Row<D> &
        TableRowsSelectionRowProps<D> &
        TableLinkHighlightRowWithSelectionRowProps<D>;
    P;

    export interface Hooks<D extends object, P extends object = {}> {
        useInstance: Array<(instance: TableInstanceWithProps<D, P>) => void>;
        prepareRow: Array<
            (
                row: RowWithProps<D, any>,
                meta: Meta<D> & { instance: TableInstanceWithProps<D, any> },
            ) => void
        >;
    }

    export type CellRenderer<
        D extends object,
        V extends any,
        E extends object = RowCellRenderProps,
    > = Renderer<FinalCellProps<D, V, E>> | undefined;

    export type HeaderRenderer<
        D extends object,
        V extends any,
        E extends object = RowCellRenderProps,
    > = Renderer<HeaderProps<D> & FinalCellProps<D, V, E>> | undefined;

    export interface TableRowProps extends TableCommonProps, TableSelectionModeRowProps {}

    export interface UseTableHooks<D extends object> extends Record<string, any> {
        useInstance: Array<(instance: FinalTableInstance<D>) => void>;
    }

    export type CustomColumnProps = {
        grow?: number;
    };

    export interface ColumnInterface<D extends object = {}> extends CustomColumnProps {
        Cell?: CellRenderer<D>;
        Header?: HeaderRenderer<D>;
    }

    export interface UseTableColumnProps<D extends object>
        extends UseResizeColumnsColumnProps<D>,
            UseSortByColumnProps<D>,
            CustomColumnProps {}
}
