import { useRef, createRef, SetStateAction, MutableRefObject } from 'react';
import { Row } from 'react-table';

export type RowRefMethods = {
	row: Row;
	isSelected: boolean;
	setIsSelected: SetStateAction<boolean>;
	setIsHighlighted: SetStateAction<boolean>;
};

export type RowRef = MutableRefObject<RowRefMethods | null>;

export type RowsRefs = Record<string, RowRef>;

type RowCallback<T extends any = void> = (rowId: string | number) => T;

export type useRowsRefsReturn = {
	refs: RowsRefs;
	initializeRef: RowCallback<RowRef>;
	deleteRef: RowCallback;
	getRowRef: RowCallback<RowRef>;
};

const useRowsRefs = () => {
	const refs = useRef<RowsRefs>({});

	const getRowRef = (rowId: string | number): RowRef => refs.current[rowId];

	const initializeRef = (rowId: string | number): RowRef => {
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
	};
};

export default useRowsRefs;
