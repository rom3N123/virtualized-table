export type ObservableListener<T> = (value: T) => any;

export type Observable<T> = {
	value: T;
	get: () => T;
	set: (value: T) => void;
	subscribe: (listener: ObservableListener<T>) => () => void;
};
