
import {window, Selection, TextDocument, TextEditor, Position, ExtensionContext, commands, Range} from 'vscode';
import {Whitespacer} from './whitespacer';

export function activate(context: ExtensionContext) {

    function convertText(whitespacerFunctionName : string) {
        var editor = getActiveEditor();
        var tabSize = Number(editor.options.tabSize);

        var document = editor.document;
        var whitespacer = new Whitespacer();
        let numSelections = editor.selections.length;
        if (numSelections <= 1 && (numSelections == 0 || editor.selections[0].isEmpty)) {
            var range = getDocumentRange(document);
            var currentText = document.getText();
            var newText = whitespacer[whitespacerFunctionName](tabSize, currentText);
            replaceText(editor, range, newText);
        } else {
            let ranges = [];
            let texts = [];
            let selections = computeLineSelections(document, editor.selections);
            numSelections = selections.length;
            for (let i: number = 0; i < numSelections; i++) {
                let sel = selections[i];
                // window.showInformationMessage('position ' + sel.start.line + ':' + sel.start.character + ' to ' + sel.end.line + ':' + sel.end.character);
                // let range : Range = lineSelectionFromSelection(document, sel);
                let range : Range = sel;
                var currentText = document.getText(range);
                var newText = whitespacer[whitespacerFunctionName](tabSize, currentText);
                ranges.push(range);
                texts.push(newText);
                // replaceText(editor, range, newText); // not work
            }
            replaceTexts(editor, ranges, texts);
        }
    }

    context.subscriptions.push(commands.registerCommand('extension.convertTabsToSpaces', () => {
        convertText('convertTabsToSpaces');
    }));

    context.subscriptions.push(commands.registerCommand('extension.convertSpacesToTabs', () => {
        convertText('convertSpacesToTabs');
    }));
}

// this method is called when your extension is deactivated
export function deactivate() {
}

function lineSelectionFromSelection(document : TextDocument, sel : Selection) : Selection {
    let endLine = sel.end.line > sel.start.line && sel.end.character == 0 ? sel.end.line - 1 : sel.end.line;
    return new Selection(new Position(sel.start.line, 0), document.lineAt(endLine).range.end);
}

function computeLineSelections(document, selections) {
    var lineSelections = [];
    let numSelections = selections.length;
    if (numSelections <= 1) {
        return numSelections == 1 ? [lineSelectionFromSelection(document, selections[0])] : [];
    }
    let sortedSelections = selections.slice(0);
    sortedSelections = sortedSelections.sort((x : Selection, y : Selection) => {
        let diff = x.start.line - y.start.line;
        if (diff != 0)
            return diff;
        return x.end.line - y.end.line;
    });
    let lastSel = lineSelectionFromSelection(document, sortedSelections[0]);
    lineSelections.push(lastSel);
    for (let i: number = 1; i < numSelections; i++) {
        let sel = lineSelectionFromSelection(document, sortedSelections[i]);
        if (sel.start.line > lastSel.end.line) {   // non-overlapping, no need union
            lastSel = sel;
            lineSelections.push(lastSel);
        } else if (sel.end.line > lastSel.end.line) {    // union and use new line end
            lineSelections[lineSelections.length - 1] = new Selection(lastSel.start, sel.end);
        } else {    // discard
        }
    }
    return lineSelections;
}

/**
 * Get vscode active editor
 *
 * @return {TextEditor}
 */
function getActiveEditor(): TextEditor {
    var editor = window.activeTextEditor;
    if (!editor) {
        return;
    }

    return editor;
}

/**
 * Get document range from the top left position until the bottom right position
 *
 * @param {TextDocument} document
 * @return {Range} range
 */
function getDocumentRange(document) {
    var startPos = new Position(0, 0);
    var lastLineIndex = getLastLineIndex(document);
    var lastCharacterIndex = getLastCharacterIndex(document);
    var endPos = new Position(lastLineIndex, lastCharacterIndex);
    var range = new Range(startPos, endPos);

    return range;
}

/**
 * Get last line index of document (index start 0).
 * If total line in document is 4, then last line index is 3 (4 - 1)
 *
 * @param {TextDocument} document
 * @return {number} last line index
 */
function getLastLineIndex(document) {
    return document.lineCount - 1;
}

/**
 * Get last character index in document.
 *
 * @param {TextDocument} document
 * @return {number} last line index
 */
function getLastCharacterIndex(document) {
    var lastLine = getLastLineIndex(document);
    return document.lineAt(lastLine).text.length;
}

/**
 * Replace text in editor
 *
 * @param {TextEditor} editor
 * @param {Range} range
 * @param {string} newText - new text to replace
 */
function replaceText(editor, range, newText) {
    editor.edit(function(editBuilder) {
        editBuilder.replace(range, newText);
    });
}

function replaceTexts(editor, ranges, texts) {
    editor.edit(editBuilder => {
        ranges.forEach((range, index) => {
            editBuilder.replace(range, texts[index]);
        });
    }).then(
        val => {},
        err => window.showErrorMessage('Tabstop Whitespace Converter: ' + err)  // Show error especially when got "Error: Overlapping ranges are not allowed!" because of two or more selections have same lines. (shouldn't happen now)
    );
}
