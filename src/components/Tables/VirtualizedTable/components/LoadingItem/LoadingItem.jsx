import React from 'react';
import { arrayOf, number, shape } from 'prop-types';
import ContentLoader from 'react-content-loader';
import { FIRST_ROW_INDENT_Y, ROW_INDENT_Y } from './LoadingItem.constants';

const LoadingItem = ({ index, data: { rows }, style }) => {
    const y = rows.length - 1 === index ? ROW_INDENT_Y : FIRST_ROW_INDENT_Y;
    const { height } = style;

    return (
        <ContentLoader height={height} style={style} width="100%">
            <rect x="0" y={y} rx="5" ry="5" width="100%" height="100%" />
        </ContentLoader>
    );
};

LoadingItem.propTypes = {
    index: number.isRequired,
    style: shape({
        top: number.isRequired,
        height: number.isRequired,
    }).isRequired,
    data: shape({
        rows: arrayOf(
            shape({
                id: number,
            })
        ),
    }).isRequired,
};

export default LoadingItem;
