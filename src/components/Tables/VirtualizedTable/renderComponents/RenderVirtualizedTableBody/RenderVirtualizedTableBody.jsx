/* eslint-disable max-len, react/prop-types, consistent-return */
import React, { useMemo, useCallback, useRef } from 'react';
import InfiniteLoader from 'react-window-infinite-loader';
import { VariableSizeList } from 'react-window';
import RenderVirtualizedTableRowWithRef from '_components/Tables/VirtualizedTable/renderComponents/RenderVirtualizedTableRow/RenderVirtualizedTableRowWithRef';
import styles from './RenderVirtualizedTableBody.module.scss';

const RenderVirtualizedTableBody = ({
    itemExtraData,
    getItemSize,
    getRowId,
    headerHeight,
    onLoadPage,
    hasNextPage,
    loadPerPage,
    isLoadingNextPage,
    ItemLoader,
}) => (
    { width, height, instance, tableRef, outerRef, RenderItem },
    listRef
) => (provided) => {
    const { innerRef, droppableProps } = provided;
    const resultListRef = listRef || useRef();

    const {
        selectedCacheRef,
        rowsRefs,
        highlightedRowRef,
        prepareRow,
        rows,
        getTableBodyProps,
        state,
        initializeRef,
        deleteRef,
    } = instance;

    const getListRef = (infiniteLoaderRef) => (listMethods) => {
        resultListRef.current = listMethods;
        infiniteLoaderRef(listMethods);
    };

    const itemSize = useCallback(
        (index) => {
            if (typeof index === 'number') {
                return typeof getItemSize === 'function'
                    ? getItemSize(
                          tableRef.current.instance.rows[index],
                          tableRef
                      )
                    : getItemSize;
            }
        },
        [getItemSize]
    );

    const isItemLoaded = useCallback(
        (index) => {
            return !hasNextPage || index < rows.length;
        },
        [hasNextPage, rows]
    );

    let itemCount = hasNextPage ? rows.length + 1 : rows.length;

    if (isLoadingNextPage) {
        itemCount = rows.length + loadPerPage;
    }

    const itemData = useMemo(
        () => ({
            ...itemExtraData,
            provided,
            getRowId,
            selectedCacheRef,
            rowsRefs,
            highlightedRowRef,
            prepareRow,
            rows,
            itemSize,
            state,
            initializeRef,
            deleteRef,
            RenderItem,
            isItemLoaded,
            ItemLoader,
        }),
        [
            itemExtraData,
            getRowId,
            prepareRow,
            rows,
            itemSize,
            state,
            RenderItem,
            isItemLoaded,
            ItemLoader,
        ]
    );

    const itemKey = (index) => {
        if (isItemLoaded(index)) {
            return getRowId(rows[index], tableRef);
        }

        return index;
    };

    return (
        <div
            className={styles.tableBody}
            ref={innerRef}
            {...getTableBodyProps()}
            {...droppableProps}
        >
            <InfiniteLoader
                itemCount={itemCount}
                loadMoreItems={onLoadPage}
                isItemLoaded={isItemLoaded}
            >
                {({ onItemsRendered, ref }) => (
                    <VariableSizeList
                        itemKey={itemKey}
                        ref={getListRef(ref)}
                        outerRef={outerRef}
                        width={width}
                        height={height - headerHeight}
                        innerRef={innerRef}
                        itemSize={itemSize}
                        itemCount={itemCount}
                        itemData={itemData}
                        onItemsRendered={onItemsRendered}
                        className="variable-size-list"
                    >
                        {RenderVirtualizedTableRowWithRef}
                    </VariableSizeList>
                )}
            </InfiniteLoader>
        </div>
    );
};

export default RenderVirtualizedTableBody;
