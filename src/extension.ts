
import {window, Selection, Position, ExtensionContext, commands, Range} from 'vscode';

export function activate(context: ExtensionContext) {

	console.log('Congratulations, your extension "vscode-whitespace" is now active!');

	var disposable = commands.registerCommand('extension.convertTabsToSpaces', () => {
		var editor = window.activeTextEditor;
        var options = editor.options;
        var document = editor.document;

        var startPos = new Position(0, 0);
        var lastLineIndex = getLastLineIndex(document);
        var lastCharacterIndex = getLastCharacterIndex(document);
        var endPos = new Position(lastLineIndex, lastCharacterIndex);
        var range = new Range(startPos, endPos);
        var currentText = document.getText();

        console.log('tab size ' + options.tabSize);

        // use + 1 to add last space
        var spaces = new Array(options.tabSize + 1).join(' ');
        var newText = currentText.replace(/\t/g, spaces);

        replaceText(editor, range, newText);
	});

    function getLastLineIndex(document) {
        return document.lineCount - 1;
    }

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

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}