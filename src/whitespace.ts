/**
 * Whitespace class
 * Contains the main functionalities
 */
export class Whitespace {

    /**
     * Convert tabs to spaces
     *
     * @param {number} tabSize - tab size
     * @param {string} text - text to be replaced that contains tabs
     * @return {string} new text after replaced to spaces
     */
    public convertTabsToSpaces(tabSize: number, text: string): string {
        // use + 1 to add last space
        var spaces = new Array(tabSize + 1).join(' ');
        var newText = text.replace(/\t/g, spaces);

        return newText;
    }

    /**
     * Convert spaces to tabs
     *
     * @param {number} tabSize - tab size
     * @param {string} text - text to be replace that contains spaces
     * @return {string} new text after replaced to tabs
     */
    public convertSpacesToTabs(tabSize: number, text: string): string {
        // use + 1 to add last space
        var spaces = new Array(tabSize + 1).join(' ');
        var newText = text.replace(new RegExp(spaces, 'g'), '\t');

        return newText;
    }
}