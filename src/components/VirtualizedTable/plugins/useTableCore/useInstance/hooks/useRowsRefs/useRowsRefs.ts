import {
	useRef,
	createRef,
	SetStateAction,
	MutableRefObject,
	Dispatch,
} from 'react';
import { Row } from 'react-table';

export type RowRefMethods<D extends object> = {
	row: Row<D>;
	isSelected: boolean;
	setIsSelected: Dispatch<SetStateAction<boolean>>;
	setIsHighlighted: Dispatch<SetStateAction<boolean>>;
};

export type RowRef<D extends object> =
	MutableRefObject<RowRefMethods<D> | null>;

export type RowsRefs<D extends object> = Record<string, RowRef<D>>;

type RowCallback<T extends any = void> = (rowId: string | number) => T;

export type UseRowsRefsReturn<D extends object> = {
	refs: MutableRefObject<RowsRefs<D>>;
	initializeRef: RowCallback<RowRef<D>>;
	deleteRef: RowCallback;
	getRowRef: RowCallback<RowRef<D>>;
};

function useRowsRefs<D extends object>() {
	const refs = useRef<RowsRefs<D>>({});

	const getRowRef = (rowId: string | number): RowRef<D> => refs.current[rowId];

	const initializeRef = (rowId: string | number): RowRef<D> => {
		const existingRef = getRowRef(rowId);

		if (existingRef) {
			return existingRef;
		}

		refs.current[rowId] = createRef();

		return refs.current[rowId];
	};

	const deleteRef = (rowId: string | number): void => {
		delete refs.current[rowId];
	};

	return {
		refs,
		initializeRef,
		deleteRef,
		getRowRef,
	} as UseRowsRefsReturn<D>;
}

export default useRowsRefs;
