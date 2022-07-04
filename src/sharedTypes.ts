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

export type CellRenderer<D extends object, V extends unknown, E extends RowCellRenderProps> =
    | Renderer<FinalCellProps<D, V, E>>
    | undefined;

export type HeaderRenderer<D extends object, V extends unknown, E extends RowCellRenderProps> =
    | Renderer<HeaderProps<D> & FinalCellProps<D, V, E>>
    | undefined;

export type FinalCellProps<D extends object, V, E extends object = {}> = FinalTableInstance<
    D,
    E
> & {
    column: ColumnInstance<D>;
    row: Row<D>;
    cell: Cell<D, V>;
    value: CellValue<V>;
};

export type CustomColumnProps = {
    grow?: number;
};

export interface ColumnInterface<D extends object, V extends unknown, E extends RowCellRenderProps>
    extends CustomColumnProps {
    Cell?: CellRenderer<D, V, E>;
    Header?: HeaderRenderer<D, V, E>;
}
