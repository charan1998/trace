export function isEmpty(value: any): boolean {
    return value === undefined || value === null;
}

export function isArrayEmpty(value: any[] | undefined): boolean {
    return isEmpty(value) || (value !== undefined && value.length === 0);
}