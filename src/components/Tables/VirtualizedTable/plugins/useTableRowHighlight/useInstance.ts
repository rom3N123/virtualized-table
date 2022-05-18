import { ProxyTarget } from './../utils';
import { USE_TABLE_CORE_PLUGIN_NAME } from './../useTableCore/useTableCore';
/* eslint-disable import/no-cycle, max-len */
import { MutableRefObject, useEffect, useState } from 'react';
import { ensurePluginOrder, Row } from 'react-table';
import useObservable from '../../../../../hooks/useObservable';
import { USE_TABLE_ROWS_SELECTION_PLUGIN_NAME } from '../useTableRowsSelection/useTableRowsSelection';
import { TableInstance } from 'react-table';
import { UseRowsRefsReturn } from '../useTableCore/useInstance/hooks/useRowsRefs/useRowsRefs';
import { TableSelectionModeInstanceProps } from '../useTableSelectionMode/useInstance';
import useSelectedRowsRefs from '../useTableRowsSelection/useInstance/hooks/useSelectedRowsRefs';
import Observable from '../../../../../helpers/Observable';

export type TableRowsSelectionInstanceProps = {
	areAllRowsSelectedObservable: Observable<boolean>;
	selectedCacheById: MutableRefObject<ProxyTarget<Record<string, object>>>;
	selectedCacheArrayRef: MutableRefObject<ProxyTarget<Record<string, object>>>;
	toggleRowSelected: (index: number) => void;
	toggleAllRowsSelected: () => void;
	getIsSelectedRow: (row: Row) => boolean;
	clearSelectedRows: () => void;
	deleteRowsFromSelected: (rowsIds: (string | number)[]) => void;
	getSelectedRows: () => Row[];
};

const useInstance = (
	instance: TableInstance & UseRowsRefsReturn & TableSelectionModeInstanceProps
) => {
	const {
		rows,
		refs,
		getRowRef,
		plugins,
		isSelectionModeObservable,
		rowsById,
		preselectedRows,
		getRowId,
	} = instance;

	const { selectedCacheByIdRef, selectedCacheArrayRef } = useSelectedRowsRefs();
	const [areAllRowsSelectedObservable] = useState<Observable<boolean>>(
		new Observable<boolean>(false)
	);

	const isSelectionMode = useObservable(isSelectionModeObservable);

	ensurePluginOrder(
		plugins,
		[USE_TABLE_CORE_PLUGIN_NAME],
		USE_TABLE_ROWS_SELECTION_PLUGIN_NAME
	);

	/**
	 * FIXME
	 */
	// useEffect(() => {
	// 	if (preselectedRows?.length) {
	// 		const instanceRows = preselectedRows
	// 			.map(selectedRow => getRowId(selectedRow))
	// 			.map(rowId => rowsById[rowId]);

	// 		for (const instanceRow of instanceRows) {
	// 			selectedCacheByIdRef.current[instanceRow.id] = instanceRow;
	// 		}
	// 		selectedCacheArrayRef.current.value = [
	// 			...instanceRows,
	// 			...selectedCacheArrayRef.current.value,
	// 		];
	// 	}
	// }, [preselectedRows]);

	const clearSelectedRows = () => {
		for (const rowId in refs.current) {
			const { current } = getRowRef(rowId);

			current?.setIsSelected(false);
		}

		selectedCacheByIdRef.current = {};

		selectedCacheArrayRef.current.value = [];

		areAllRowsSelectedObservable.set(false);
	};

	const deleteRowsFromSelected = (rowsIds: (number | string)[]) => {
		if (rows.length === rowsIds.length) {
			selectedCacheByIdRef.current = {};
			selectedCacheArrayRef.current.value = [];
		} else {
			for (const rowId of rowsIds) {
				delete selectedCacheByIdRef.current[rowId];
			}

			selectedCacheArrayRef.current.value =
				selectedCacheArrayRef.current.value.filter(
					row => !rowsIds.includes(row.id)
				);
		}
	};

	const toggleRowSelected = (index: number) => {
		const row = rows[index];
		const { id } = row;
		const isSelected = Boolean(selectedCacheByIdRef.current[id]);
		const rowRef = getRowRef(id);

		rowRef?.current?.setIsSelected(prevState => !prevState);

		if (isSelected) {
			delete selectedCacheByIdRef.current[id];

			selectedCacheArrayRef.current.value =
				selectedCacheArrayRef.current.value.filter(row => row.id !== id);

			if (areAllRowsSelectedObservable.get()) {
				areAllRowsSelectedObservable.set(false);
			}
		} else {
			selectedCacheArrayRef.current.value = [
				...selectedCacheArrayRef.current.value,
				row,
			];
			selectedCacheByIdRef.current[id] = row;

			if (selectedCacheArrayRef.current.value.length === rows.length) {
				areAllRowsSelectedObservable.set(true);
			}
		}
	};

	const toggleAllRowsSelected = () => {
		if (selectedCacheArrayRef.current.value.length !== rows.length) {
			for (const rowId in refs.current) {
				const { current } = getRowRef(rowId);

				current?.setIsSelected(true);
			}

			selectedCacheByIdRef.current = rowsById;
			selectedCacheArrayRef.current.value = rows;

			areAllRowsSelectedObservable.set(true);
		} else {
			clearSelectedRows();
		}
	};

	const getIsSelectedRow = ({ id }: Row) =>
		Boolean(selectedCacheByIdRef.current[id]);

	useEffect(() => {
		if (
			!isSelectionMode &&
			selectedCacheArrayRef.current.value.length &&
			!preselectedRows?.length
		) {
			clearSelectedRows();
		}
	}, [isSelectionMode]);

	const getSelectedRows = () => {
		return selectedCacheArrayRef.current.value.map(row => rowsById[row.id]);
	};

	Object.assign(instance, {
		areAllRowsSelectedObservable,
		selectedCacheById: selectedCacheByIdRef.current,
		selectedCacheArrayRef,
		toggleRowSelected,
		toggleAllRowsSelected,
		getIsSelectedRow,
		clearSelectedRows,
		deleteRowsFromSelected,
		getSelectedRows,
	});
};

export default useInstance;
