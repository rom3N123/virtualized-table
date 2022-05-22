import { useState, useEffect } from 'react';
import { Observable } from './../../helpers/Observable/Observable.types';

export const useObservable = <T>(observable: Observable<T>): T => {
	const [value, setValue] = useState<T>(observable.get());

	useEffect(() => {
		return observable.subscribe(setValue);
	}, []);

	return value;
};
