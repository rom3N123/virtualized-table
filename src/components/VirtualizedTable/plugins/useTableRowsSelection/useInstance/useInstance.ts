import { TableInstanceWithProps } from 'react-table';
import { ProxyTarget } from './../../utils';
import { UseRowsRefsReturn } from './../../useTableCore/useInstance/hooks/useRowsRefs/useRowsRefs';
import { TableSelectionModeInstanceProps } from './../../useTableSelectionMode/useInstance';
import { USE_TABLE_CORE_PLUGIN_NAME } from './../../useTableCore/useTableCore';
import { useEffect, useState, RefObject } from 'react';
import { useObservable } from '../../../../../hooks';
import { Observable } from '../../../../../helpers';
import { ensurePluginOrder, Row } from 'react-table';
import { useSelectedRowsRefs } from './hooks/useSelectedRowsRefs/useSelectedRowsRefs';
import { USE_TABLE_ROWS_SELECTION_PLUGIN_NAME } from '../useTableRowsSelection';

export type TableRowsSelectionInstanceProps<D extends object> = {
	areAllRowsSelectedObservable: Observable<boolean>;
	selectedCacheById: Record<string, Row<D>>;
	selectedCacheArrayRef: RefObject<ProxyTarget<string[]>>;
	toggleRowSelected: (index: number) => void;
	toggleAllRowsSelected: () => void;
	getIsSelectedRow: (row: Row<D>) => boolean;
	clearSelectedRows: () => void;
	deleteRowsFromSelected: (rowsIds: (number | string)[]) => void;
	getSelectedRows: () => Row<D>[];
};

export type TableRowsSelectionUseInstanceProps<D extends object> =
	TableSelectionModeInstanceProps &
		UseRowsRefsReturn<D> & { preselectedRows: D[] };

export type TableRowsSelectionInstance<D extends object> =
	TableInstanceWithProps<D, TableRowsSelectionUseInstanceProps<D>>;

const useInstance = <D extends object>(
	instance: TableRowsSelectionInstance<D>
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

	const { selectedCacheByIdRef, selectedCacheArrayRef } =
		useSelectedRowsRefs<D>();
	const [areAllRowsSelectedObservable] = useState(new Observable(false));

	const isSelectionMode = useObservable(isSelectionModeObservable);

	ensurePluginOrder(
		plugins,
		[USE_TABLE_CORE_PLUGIN_NAME],
		USE_TABLE_ROWS_SELECTION_PLUGIN_NAME
	);

	useEffect(() => {
		if (preselectedRows?.length) {
			const instanceRows = preselectedRows
				.map((selectedRow, index) => getRowId!(selectedRow, index))
				.map(rowId => rowsById[rowId]);

			for (const instanceRow of instanceRows) {
				selectedCacheByIdRef.current[instanceRow.id] = instanceRow;
			}
			selectedCacheArrayRef.current.value = [
				...instanceRows.map(row => row.id),
				...selectedCacheArrayRef.current.value,
			];
		}
	}, [preselectedRows]);

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
					rowId => !rowsIds.includes(rowId)
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
				selectedCacheArrayRef.current.value.filter(rowId => rowId !== id);

			if (areAllRowsSelectedObservable.get()) {
				areAllRowsSelectedObservable.set(false);
			}
		} else {
			selectedCacheArrayRef.current.value = [
				...selectedCacheArrayRef.current.value,
				row.id,
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
			selectedCacheArrayRef.current.value = rows.map(row => row.id);

			areAllRowsSelectedObservable.set(true);
		} else {
			clearSelectedRows();
		}
	};

	const getIsSelectedRow = ({ id }: Row<D>) =>
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
		return selectedCacheArrayRef.current.value.map(rowId => rowsById[rowId]);
	};

	const instanceProps: TableRowsSelectionInstanceProps<D> = {
		areAllRowsSelectedObservable,
		selectedCacheById: selectedCacheByIdRef.current,
		selectedCacheArrayRef,
		toggleRowSelected,
		toggleAllRowsSelected,
		getIsSelectedRow,
		clearSelectedRows,
		deleteRowsFromSelected,
		getSelectedRows,
	};

	Object.assign(instance, instanceProps);
};

export default useInstance;
