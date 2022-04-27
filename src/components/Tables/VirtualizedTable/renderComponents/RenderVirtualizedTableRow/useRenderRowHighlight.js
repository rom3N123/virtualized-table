import { useState, useLayoutEffect } from 'react';

const useRenderRowHighlight = ({ row, highlightedRowRef }) => {
    const [isSelected, setIsSelected] = useState(false);
    const [isHighlighted, setIsHighlighted] = useState(false);

    useLayoutEffect(() => {
        const isRowSelected = row.getIsSelectedRow(row);

        if (highlightedRowRef.current.value?.id === row.id) {
            setIsHighlighted(true);
        } else if (isSelected !== isRowSelected) {
            setIsSelected(isRowSelected);
        }
    }, [row]);

    return {
        isSelected,
        setIsSelected,
        isHighlighted,
        setIsHighlighted,
    };
};

export default useRenderRowHighlight;
