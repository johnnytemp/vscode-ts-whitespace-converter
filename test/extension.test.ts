
import * as assert from 'assert';
import * as vscode from 'vscode';
import * as myExtension from '../src/extension';
import { Whitespacer } from '../src/whitespacer';

suite('Extension Tests', () => {
    test('Whitespacer: Convert tabs to spaces', () => {
        let whitespacer = new Whitespacer();

        var inputText = '\ta\n\t\nb\t\nc\t\td\n \t\te全\tf\0\t'; // width of \0 is zero.  "全" is a full-width (width=2) char
        var tabSize = 2;
        var newText = whitespacer.convertTabsToSpaces(tabSize, inputText);
        assert.equal(newText, '  a\n  \nb \nc   d\n    e全 f\0 ');

        tabSize = 3;
        newText = whitespacer.convertTabsToSpaces(tabSize, inputText);
        assert.equal(newText, '   a\n   \nb  \nc     d\n      e全   f\0  ');
    });

    test('Whitespacer: Convert spaces to tabs', () => {
        let whitespacer = new Whitespacer();

        let inputText = '  a\n  \nb  \nc    d\n     ee    f   ';
        let tabSize = 2;
        let newText = whitespacer.convertSpacesToTabs(tabSize, inputText);

        assert.equal(newText, '\ta\n\t\nb  \nc \t d\n\t\t ee \t f\t ');
    });
});