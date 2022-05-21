import { Dispatch, SetStateAction } from 'react';

type CombineFunctions = <T>(
	setSelectedRows?: Dispatch<SetStateAction<T[]>>,
	setIsSomeRowsSelected?: Dispatch<SetStateAction<boolean>>
) => (rows: T[]) => void;

export const combineFunctions: CombineFunctions =
	(setSelectedRows, setIsSomeRowsSelected) => rows => {
		setSelectedRows?.(rows);
		setIsSomeRowsSelected?.(Boolean(rows.length));
	};

export type ProxyTarget<T> = { value: T };

export const getProxiedArray = <R extends object>(
	target: ProxyTarget<R[]>,
	setState: Dispatch<SetStateAction<R[]>>
) => {
	return new Proxy(target, {
		set(target: ProxyTarget<R[]>, property: 'value', value: R[]) {
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
