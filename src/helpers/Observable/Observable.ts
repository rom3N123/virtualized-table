export default class ObservableImplementation<T> implements Observable<T> {
	constructor(private _value: T, private listeners: ObservableListener<T>[]) {}

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

	subscribe(listener: ObservableListener<T>) {
		this.listeners.push(listener);
		return () => {
			this.listeners.filter(l => l !== listener);
		};
	}
}
