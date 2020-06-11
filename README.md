# Visual Studio Code Tabstop Whitespace Converter
Help you with tasks such as:
- Convert Tabs to Spaces
- Convert Spaces to Tabs

Remark: current text selections are considered for the lines to be converted. If selection is empty, the whole document is converted.

For most editors, a tab character should align to next tabstop which is multiple column of tab size.
This plugin will correctly treat a tab as 1 to tab size number of spaces up to the next tabstop.

This project is forked from plugin "vscode whitespacer" (commit 4a4db34e8f) (Credit: Budi Irawan), but with conversion logic changed to regard tabstop.
For usage, you may reference the demo for "vscode whitespacer" at:

    https://raw.githubusercontent.com/deerawan/vscode-whitespacer/master/images/whitespacer-usage.gif

## Installation
Type `cmd-shift-p` to launch command palette and choose `Extensions: Install Extension`. Search **tabstop whitespace converter** and install.

## Usage
Type `cmd-shift-p` to launch command palette, type **tabstop whitespace converter** then pick the command you want to use.

## License
[MIT](https://github.com/johnnytemp/vscode-ts-whitespace-converter/blob/master/LICENSE)
