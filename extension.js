// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const path = require('path');
const safeEval = require('safe-eval')
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

const EXT_NAME = 'hello-vscode-extension'
/**
 * @param {vscode.ExtensionContext} context
 */
function activate (context) {

  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(`Congratulations, your extension "${EXT_NAME}" is now active!`);

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  const inputText = (text = '', delim = '\n', editor = vscode.window.activeTextEditor, selection = editor.selection) => {
    const _text = Array.isArray(text) ? text.join(delim) : text
    return editor.edit(editBuilder => {
      editBuilder.replace(selection, _text)
    })
  }
  const toRegisterCommands = [
    {
      key: 'runJSAsScript',
      // args: () => [],
      // cmd(args = [], cmdInfo) {
      cmd () {
        // The code you place here will be executed every time your command is executed
        const editor = vscode.window.activeTextEditor

        if (editor) {
          const document = editor.document
          // const selection = new vscode.Position(document.lineCount, 0)
          // const selection = editor.selection.active
          const selection = editor.selection

          const input = document.getText(selection)
          const expr = safeEval(input)
          const text = typeof expr === 'function' ? expr() : expr
          inputText(text)
        }
      }
    },
    {
      key: 'runJSAsArgumentByInput',
      // args: () => [],
      // args: () => [],
      // cmd(cmdInfo) {
      cmd () {
        const editor = vscode.window.activeTextEditor

        if (editor) {
          const document = editor.document
          // const selection = new vscode.Position(document.lineCount, 0)
          // const selection = editor.selection.active
          const selection = editor.selection

          const input = document.getText(selection)
          return vscode.window.showInputBox({
            title: 'Input JS script you want to run.'
          }).then(script => {
            // vscode.window.showInformationMessage(`res: ${res}, input: ${input}`)
            const expr = safeEval(script)
            const text = typeof expr === 'function' ? expr.apply(null, [input]) : input
            inputText(text)
          })
          // const expr = safeEval(input)
          // const text = typeof expr === 'function' ? expr() : expr
          // editor.edit(editBuilder => {
          //   editBuilder.replace(selection, text)
          // })
        }
      }
    },
    {
      key: 'runJSAsArgumentWithEditorScript',
      // args: () => [],
      // args: () => [],
      // cmd(cmdInfo) {
      cmd () {
        const editor = vscode.window.activeTextEditor

        if (editor) {
          const document = editor.document
          // const selection = new vscode.Position(document.lineCount, 0)
          // const selection = editor.selection.active
          const selection = editor.selection

          const input = document.getText(selection)
          // return vscode.workspace.openTextDocument({ language: 'javascript', content: '/* input your script here */\n' })
          // const file = vscode.Uri.parse('untitled:' + path.join(vscode.workspace.workspaceFolders, 'untitled.js'))
          // return vscode.workspace.openTextDocument(file)
          return vscode.workspace.openTextDocument({ language: 'javascript', content: '' })
            .then(editor => vscode.window.showTextDocument(editor, 1, false))
            .then(editor => {
              editor.edit(editBuilder => editBuilder.insert(editor.document.positionAt(0), '/* input your script here */\n'))
            })

          // return vscode.window.showInputBox({
          //   title: 'Input JS script you want to run.'
          // }).then(script => {
          //   // vscode.window.showInformationMessage(`res: ${res}, input: ${input}`)
          //   const expr = safeEval(script)
          //   const text = typeof expr === 'function' ? expr.apply(null, [input]) : input
          //   inputText(text)
          // })
          // const expr = safeEval(input)
          // const text = typeof expr === 'function' ? expr() : expr
          // editor.edit(editBuilder => {
          //   editBuilder.replace(selection, text)
          // })
        }
      }
    }
  ]

    ; toRegisterCommands.forEach(({ key, cmd }) => {
      const cmdInfo = ({ key })
      context.subscriptions.push(vscode.commands.registerCommand(`${EXT_NAME}.${key}`, () => {
        try {
          Promise.resolve().then(() => cmd.apply(null, [cmdInfo]))
            .then(() => {
              vscode.window.showInformationMessage(`${cmdInfo.key} complete.`);
            }).catch(e => { throw e })
        } catch (e) {
          vscode.window.showErrorMessage(`Error occured in ${cmdInfo.key} :: ${e.message}`);
        }
      }))
    })
}

// this method is called when your extension is deactivated
function deactivate () { }

module.exports = {
  activate,
  deactivate
}
