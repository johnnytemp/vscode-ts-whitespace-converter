
import * as assert from 'assert';
import * as vscode from 'vscode';
import * as myExtension from '../src/extension';
import {Whitespace} from '../src/whitespace';

suite("Extension Tests", () => {

	test("Convert tabs to spaces", () => {
		let whitespace = new Whitespace();

        let inputText = '\ta\n\t\nb\t\nc\t\td';
        let tabSize = 2;
        let newText = whitespace.convertTabsToSpaces(tabSize, inputText);

        assert.equal(newText, '  a\n  \nb  \nc    d');
	});
});