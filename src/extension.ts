// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import opener = require('opener');

function langInActiveTextEditor(editor:vscode.TextEditor):string{
	return editor.document.languageId;
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
		console.log('Congratulations, your extension "fast-search-about-this-lang" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.fastSearch', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		if(vscode.window.activeTextEditor){
			let this_lang:string = langInActiveTextEditor(vscode.window.activeTextEditor);

			let inputbox_option: vscode.InputBoxOptions = {
				value: `${this_lang} `,
				prompt:`Just ready to search about "${this_lang}". Please type more words!`
			};
			vscode.window.showInputBox(inputbox_option).
			then((input_val)=>{
				console.log(`search: ${this_lang} ${input_val}`);
				let google_search_query:string = encodeURIComponent(`${input_val}`);
				opener(`https://www.google.com/search?q=${google_search_query}`);
			});
		}
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
