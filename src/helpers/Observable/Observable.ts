import * as T from './Observable.types';
export default class ObservableImplementation<T> implements T.Observable<T> {
	private listeners: T.ObservableListener<T>[] = [];

	constructor(private _value: T) {}

	get value() {
		return this._value;
	}

	get() {
		return this.value;
	}

	set(value: T) {
		this._value = value;
		this.listeners.forEach(listener => listener(this.value));
	}

	subscribe(listener: T.ObservableListener<T>) {
		this.listeners.push(listener);
		return () => {
			this.listeners.filter(l => l !== listener);
		};
	}
}
