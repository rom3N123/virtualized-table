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

export type CellRenderer<D extends object, V extends unknown> =
    | Renderer<FinalCellProps<D, V>>
    | undefined;

export type HeaderRenderer<D extends object, V extends unknown> =
    | Renderer<HeaderProps<D> & FinalCellProps<D, V>>
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

export interface ColumnInterface<D extends object, V extends unknown>
    extends CustomColumnProps {
    Cell?: CellRenderer<D, V>;
    Header?: HeaderRenderer<D, V>;
}
