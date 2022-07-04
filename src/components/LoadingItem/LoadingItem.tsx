import ContentLoader from 'react-content-loader';
import { RenderItemProps } from '../VirtualizedTable/types';

const ROW_INDENT_Y = 0;
const FIRST_ROW_INDENT_Y = 10;

export const LoadingItem = <D extends object = {}, E extends object = {}>({
    index,
    data: { rows },
    style,
}: RenderItemProps<D, E>) => {
    const y = rows.length - 1 === index ? ROW_INDENT_Y : FIRST_ROW_INDENT_Y;
    const { height } = style;

    return (
        <ContentLoader height={height} style={style} width="100%">
            <rect x="0" y={y} rx="5" ry="5" width="100%" height="100%" />
        </ContentLoader>
    );
};
