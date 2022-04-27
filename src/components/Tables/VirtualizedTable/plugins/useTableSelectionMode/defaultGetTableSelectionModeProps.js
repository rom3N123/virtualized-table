import useObservable from 'hooks/useObservable';

const defaultGetTableSelectionModeProps = (props, { instance }) => {
    const {
        enableTableSelectionMode,
        disableTableSelectionMode,
        changeTableSelectionMode,
        isSelectionModeObservable,
    } = instance;

    const isSelectionMode = useObservable(isSelectionModeObservable);

    return [
        props,
        {
            enableTableSelectionMode,
            disableTableSelectionMode,
            changeSelectionMode: changeTableSelectionMode,
            isSelectionMode,
        },
    ];
};

export default defaultGetTableSelectionModeProps;
