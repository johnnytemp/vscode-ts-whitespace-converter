
import * as assert from 'assert';
import * as vscode from 'vscode';
import * as myExtension from '../src/extension';
import {Whitespace} from '../src/whitespace';

suite('Extension Tests', () => {
	test('Whitespace: Convert tabs to spaces', () => {
		let whitespace = new Whitespace();

        var inputText = '\ta\n\t\nb\t\nc\t\td';
        var tabSize = 2;
        var newText = whitespace.convertTabsToSpaces(tabSize, inputText);
        assert.equal(newText, '  a\n  \nb  \nc    d');

        tabSize = 3;
        newText = whitespace.convertTabsToSpaces(tabSize, inputText);
        assert.equal(newText, '   a\n   \nb   \nc      d');
	});

    test('Whitespace: Convert spaces to tabs', () => {
		let whitespace = new Whitespace();

        let inputText = '  a\n  \nb  \nc    d';
        let tabSize = 2;
        let newText = whitespace.convertSpacesToTabs(tabSize, inputText);

        assert.equal(newText, '\ta\n\t\nb\t\nc\t\td');
	});
});