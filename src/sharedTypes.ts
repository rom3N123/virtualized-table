import {
    RowCellRenderProps,
    Renderer,
    FinalTableInstance,
    ColumnInstance,
    Row,
    Cell,
    CellValue,
    HeaderProps,
} from 'react-table';

export type CellRenderer<D extends object, V extends any, E extends object = RowCellRenderProps> =
    | Renderer<FinalCellProps<D, V, E>>
    | undefined;

export type HeaderRenderer<
    D extends object,
    V extends any,
    E extends object = RowCellRenderProps,
> = Renderer<HeaderProps<D> & FinalCellProps<D, V, E>> | undefined;

export type FinalCellProps<D extends object, V = any, E extends object = {}> = FinalTableInstance<
    D,
    E
> & {
    column: ColumnInstance<D>;
    row: Row<D>;
    cell: Cell<D, V>;
    value: CellValue<V>;
};
