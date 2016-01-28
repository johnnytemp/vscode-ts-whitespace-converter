
import {window, Selection, TextEditor, Position, ExtensionContext, commands, Range} from 'vscode';
import {Whitespace} from './whitespace';

export function activate(context: ExtensionContext) {

	context.subscriptions.push(commands.registerCommand('extension.convertTabsToSpaces', () => {
		var editor = getActiveEditor();

        var document = editor.document;
        var range = getDocumentRange(document);
        var currentText = document.getText();

        var whitespace = new Whitespace();
        var newText = whitespace.convertTabsToSpaces(editor.options.tabSize, currentText);

        replaceText(editor, range, newText);
	}));
}

// this method is called when your extension is deactivated
export function deactivate() {
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