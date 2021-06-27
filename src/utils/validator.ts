export const validateRequire = (values: any, keys: string[], message: string) => {
    const errors = keys.reduce((errors, key) => {
			
    if (!values[key]) {
        errors[key] = message;
        return errors;
    }

    return errors;
    }, []);

    return errors;
};