/**
 * Whitespacer class
 * Contains the main functionalities
 */
export class Whitespacer {

    /**
     * Convert tabs to spaces
     *
     * @param {number} tabSize - tab size
     * @param {string} text - text to be replaced that contains tabs
     * @return {string} new text after replaced to spaces
     */
    public convertTabsToSpaces(tabSize: number, text: string): string {
        /* // use + 1 to add last space
        var spaces = new Array(tabSize + 1).join(' ');
        var newText = text.replace(/\t/g, spaces); */

        // convert tabs to the right tabstops property
        var newText = text.replace(/[^\r\n\t]*\t+/g, function (x) {
            let width = 0; // characters total width before tab
            let i = 0;
            for (; ; ++i) {
                let c = x.charCodeAt(i);
                if (c == 0x09) // tab char
                    break;
                // simplified way of checking character width
                if ((c >= 0x0020 && c <= 0x1FFF) || (c >= 0xFF61 && c <= 0xFF9F)) {
                    width += 1;
                } else if ((c >= 0x2000 && c <= 0xFF60) || (c >= 0xFFA0)) {
                    width += 2; // full-width char
                } else {
                    width += 0; // zero-width char
                }
            }
            let numTabs = x.length - i;
            let totalTabSize = tabSize * numTabs - (width % tabSize);
            return x.substr(0, i) + " ".repeat(totalTabSize);
        });

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
        /* // use + 1 to add last space
        var spaces = new Array(tabSize + 1).join(' ');
        var newText = text.replace(new RegExp(spaces, 'g'), '\t'); */

        // Only convert leading whitespaces for simplicity.  It is difficult to convert inline spaces to the right tabstop with regular expression.
        var regex2 = new RegExp("[ ]{" + tabSize + "}|[ ]{0," + (tabSize - 1) + "}\t", 'g');
        var newText = text.replace(new RegExp("^([ ]{" + tabSize + "}|[ ]{0," + (tabSize - 1) + "}\t)*", 'mg'), function (x) {
            return x.replace(regex2, '\t');
        });

        return newText;
    }
}