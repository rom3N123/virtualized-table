import React, { cloneElement } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { func, node, shape } from 'prop-types';
import useNewSyncHorizontalScroll from 'hooks/useNewSyncHorizontalScroll';

const RenderVirtualizedTable = ({
    instance: { getTableProps },
    header,
    body,
}) => {
    const { getContainerRef, getHeaderRef } = useNewSyncHorizontalScroll();

    return (
        <div style={{ height: '100%' }}>
            <AutoSizer>
                {({ width, height }) => (
                    <div
                        {...getTableProps({
                            style: {
                                height,
                                width,
                            },
                        })}
                    >
                        {cloneElement(header, { headerRef: getHeaderRef })}

                        {cloneElement(body, {
                            width,
                            height,
                            outerRef: getContainerRef,
                            mode: 'virtual',
                        })}
                    </div>
                )}
            </AutoSizer>
        </div>
    );
};

RenderVirtualizedTable.propTypes = {
    header: node.isRequired,
    body: node.isRequired,
    instance: shape({
        getTableProps: func.isRequired,
    }).isRequired,
};

export default RenderVirtualizedTable;
