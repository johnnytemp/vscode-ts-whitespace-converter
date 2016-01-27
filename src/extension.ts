
import {window, Selection, Position, ExtensionContext, commands} from 'vscode';

export function activate(context: ExtensionContext) {

	console.log('Congratulations, your extension "vscode-whitespace" is now active!');

	var disposable = commands.registerCommand('extension.convertTabsToSpaces', () => {
		var editor = window.activeTextEditor;
        var options = editor.options;
        var document = editor.document;

        var startPos = new Position(0, 0);
        var endPos = new Position(document.lineCount - 1, document.lineAt(document.lineCount - 1).text.length);

        console.log(document.lineCount);
        console.log(document.getText());

	});

    function getLastLineValue(document) {
        return document.lineCount - 1;
    }

    function getLastCharacterValue(document) {
        var lastLine = getLastLineValue(document);
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