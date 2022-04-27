/* eslint-disable max-len */
import {
    useTableRowHighlight,
    useTableRowsSelection,
    useTableSelectionMode,
    useTableCore,
    useLinkHighlightRowWithSelection,
} from '_components/Tables/VirtualizedTable/plugins';

export const VIRTUALIZED_TABLE_PLUGINS = [
    useTableCore,
    useTableSelectionMode,
    useTableRowsSelection,
    useTableRowHighlight,
    useLinkHighlightRowWithSelection,
];
