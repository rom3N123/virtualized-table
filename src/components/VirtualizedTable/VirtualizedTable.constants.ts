import {
    useTableRowHighlight,
    useTableRowsSelection,
    useTableSelectionMode,
    useTableCore,
    useLinkHighlightRowWithSelection,
} from './plugins';

export const VIRTUALIZED_TABLE_PLUGINS = [
    useTableCore,
    useTableSelectionMode,
    useTableRowsSelection,
    useTableRowHighlight,
    useLinkHighlightRowWithSelection,
];
