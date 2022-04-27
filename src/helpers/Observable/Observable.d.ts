type ObservableListener<T> = (value: T) => any;

type Observable<T> = {
	value: T;
	get: () => T;
	set: (value: T) => void;
	subscribe: (listener: ObservableListener<T>) => () => void;
};
