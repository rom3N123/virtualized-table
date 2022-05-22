import { Dispatch, SetStateAction } from 'react';

type CombineFunctions = (
    setSelectedRows?: Dispatch<SetStateAction<string[]>>,
    setIsSomeRowsSelected?: Dispatch<SetStateAction<boolean>>
) => (rowsIds: string[]) => any;

export const combineFunctions: CombineFunctions =
    (setSelectedRows, setIsSomeRowsSelected) => (rowsIds) => {
        setSelectedRows?.(rowsIds);
        setIsSomeRowsSelected?.(Boolean(rowsIds.length));
    };

export type ProxyTarget<T> = { value: T };

export const getProxiedArray = (
    target: ProxyTarget<string[]>,
    setState: (rowsIds: string[]) => any
) => {
    return new Proxy(target, {
        set(target: ProxyTarget<string[]>, property: 'value', value: string[]) {
            target[property] = value;

            setState?.([...target.value]);

            return true;
        },
    });
};

export const getProxiedObject = <O extends object | null>(
    target: ProxyTarget<O>,
    setState: Dispatch<SetStateAction<O | null>>
) => {
    return new Proxy(target, {
        set(target: ProxyTarget<O>, property: 'value', value: O) {
            target[property] = value;

            const newValue = value === null ? null : { ...target.value };

            setState?.(newValue);

            return true;
        },
    });
};
