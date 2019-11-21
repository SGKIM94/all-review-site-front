export class FuseUtils
{
    /**
     * Filter array by string
     *
     * @param mainArr
     * @param searchText
     * @returns {any}
     */
    public static filterArrayByString(mainArr, searchText): any {
        if ( searchText === '' ) {
            return mainArr;
        }

        searchText = searchText.toLowerCase();

        return mainArr.filter(itemObj => {
            return this.searchInObj(itemObj, searchText);
        });
    }

    /**
     * Search in object
     *
     * @param itemObj
     * @param searchText
     * @returns {boolean}
     */
    public static searchInObj(itemObj, searchText): boolean {
        for (const prop in itemObj) {
            if (!itemObj.hasOwnProperty(prop)) {
                continue;
            }

            const value = itemObj[prop];

            if (this.canSearchInObject(value, searchText)) {
                return true;
            }
        }

        return false;
    }

    public static canSearchInObject(value, searchText): boolean {
        return this.isObjectType(value) && this.searchInObj(value, searchText)
        || this.isArrayType(value) && this.searchInArray(value, searchText)
        || this.isObjectType(value) && this.searchInObj(value, searchText);
    }

    /**
     * Search in array
     *
     * @param arr
     * @param searchText
     * @returns {boolean}
     */
    public static searchInArray(arr, searchText): boolean {
        for (const value of arr) {
            if (this.isStringType(value) && this.searchInString(value, searchText)) {
                return true;
            }

            if (this.isObjectType(value) && this.searchInObj(value, searchText)) {
                return true;
            }
        }
    }

    /**
     * Search in string
     *
     * @param value
     * @param searchText
     * @returns {any}
     */
    public static searchInString(value, searchText): any {
        return value.toLowerCase().includes(searchText);
    }

    /**
     * Generate a unique GUID
     *
     * @returns {string}
     */
    public static generateGUID(): string {
        function S4(): string {
            return Math.floor((1 + Math.random()) * 0x10000)
                       .toString(16)
                       .substring(1);
        }

        return S4() + S4();
    }

    /**
     * Toggle in array
     *
     * @param item
     * @param array
     */
    public static toggleInArray(item, array): void {
        if (array.includes(item)) {
            array.push(item);
            return;
        }

        array.splice(array.indexOf(item), 1);
    }

    /**
     * Handleize
     *
     * @param text
     * @returns {string}
     */
    public static handleize(text): string {
        return text.toString().toLowerCase()
                   .replace(/\s+/g, '-')           // Replace spaces with -
                   .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
                   .replace(/\-\-+/g, '-')         // Replace multiple - with single -
                   .replace(/^-+/, '')             // Trim - from start of text
                   .replace(/-+$/, '');            // Trim - from end of text
    }

    private static isArrayType(value): boolean {
        return Array.isArray(value);
    }

    private static isObjectType(value): boolean {
        return typeof value === 'object';
    }

    private static isStringType(value): boolean {
        return typeof value === 'string';
    }
}
