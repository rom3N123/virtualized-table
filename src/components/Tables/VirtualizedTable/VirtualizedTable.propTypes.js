import { shape, func } from 'prop-types';

export const tableRefShape = shape({
    current: shape({
        changeTableSelectionMode: func.isRequired,
        enableTableSelectionMode: func.isRequired,
        disableTableSelectionMode: func.isRequired,
    }),
});
