export const combineFunctions = (setSelectedRows, setIsSomeRowsSelected) => (
    value
) => {
    setSelectedRows?.(value);
    setIsSomeRowsSelected?.(Boolean(value.length));
};

export const getProxiedArray = (target, setState) => {
    return new Proxy(target, {
        set(target, property, value) {
            target[property] = value;

            if (setState) {
                setState([...target.value]);
            }

            return true;
        },
    });
};

export const getProxiedObject = (target, setState) => {
    return new Proxy(target, {
        set(target, property, value) {
            target[property] = value;

            const newValue = value === null ? null : { ...target.value };

            if (setState) {
                setState(newValue);
            }

            return true;
        },
    });
};
