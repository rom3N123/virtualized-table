import React, { cloneElement } from 'react';
import { func, node, shape } from 'prop-types';
import useNewSyncHorizontalScroll from 'hooks/useNewSyncHorizontalScroll';

const DefaultRenderTable = ({ instance: { getTableProps }, header, body }) => {
    const { getContainerRef, getHeaderRef } = useNewSyncHorizontalScroll();

    return (
        <div {...getTableProps()}>
            {cloneElement(header, { headerRef: getHeaderRef })}

            {cloneElement(body, { outerRef: getContainerRef })}
        </div>
    );
};

DefaultRenderTable.propTypes = {
    header: node.isRequired,
    body: node.isRequired,
    instance: shape({
        getTableProps: func.isRequired,
    }).isRequired,
};

export default DefaultRenderTable;
