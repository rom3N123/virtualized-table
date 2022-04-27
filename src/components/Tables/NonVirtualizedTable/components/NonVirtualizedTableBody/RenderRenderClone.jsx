import React from 'react';

const RenderRenderClone = (Clone, props) => (provided, snapshot, rubric) => {
    // eslint-disable-next-line react/prop-types
    const { rows } = props;
    const { draggableProps, dragHandleProps, innerRef } = provided;

    const {
        source: { index },
    } = rubric;

    const row = rows[index];

    return (
        <Clone
            ref={innerRef}
            row={row}
            provided={provided}
            snapshot={snapshot}
            rubric={rubric}
            draggableProps={draggableProps}
            dragHandleProps={dragHandleProps}
            {...props}
        />
    );
};

export default RenderRenderClone;
