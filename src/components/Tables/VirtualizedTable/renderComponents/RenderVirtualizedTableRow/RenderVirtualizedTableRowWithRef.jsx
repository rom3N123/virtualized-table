/* eslint-disable max-len */
import React, { memo, useEffect } from 'react';
import RenderVirtualizedTableRow from '_components/Tables/VirtualizedTable/renderComponents/RenderVirtualizedTableRow/RenderVirtualizedTableRow';
import { areEqual } from 'react-window';
import { any, arrayOf, elementType, number, shape } from 'prop-types';

const RenderVirtualizedTableRowWithRef = memo(
    ({ index, data, ...otherProps }) => {
        const { initializeRef, rows, deleteRef, RenderItem } = data;

        const rowId = rows[index]?.id;

        const rowRef = initializeRef(rowId);

        useEffect(() => {
            return () => {
                deleteRef(rowId);
            };
        }, []);

        const ItemRenderFunction = RenderItem || RenderVirtualizedTableRow;

        return (
            <ItemRenderFunction
                ref={rowRef}
                index={index}
                data={data}
                {...otherProps}
            />
        );
    },
    areEqual
);

RenderVirtualizedTableRowWithRef.propTypes = {
    index: number.isRequired,
    data: shape({
        rowsRefs: shape({
            current: arrayOf({
                current: any,
            }),
        }),
        RenderItem: elementType,
    }).isRequired,
};

export default RenderVirtualizedTableRowWithRef;
