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

          // const rootPath = context.globalStorageUri.path
          // console.log('vscode.workspace.rootPath', rootPath)
          // // const file = vscode.Uri.parse('untitled' + ':' + path.join(rootPath, 'untitled.js'))
          // const file = vscode.Uri.parse('untitled:' + path.join(rootPath, 'untitled.js'))

          // return vscode.workspace.openTextDocument(file)
          //   // return vscode.workspace.openTextDocument({ language: 'javasrcipt', content: '' })
          //   .then(editor => vscode.window.showTextDocument(editor, 1, false))
          //   .then(editor => {
          //     editor.edit(editBuilder => editBuilder.insert(editor.document.positionAt(0), '/* input your script here */\n'))
          //   }).then(() => {
          //     return new Promise(resolve => {
          //       const onCloseEvent = vscode.workspace.onDidCloseTextDocument(({ fileName, getText }) => {
          //         console.log('fileName', fileName, path.join(rootPath, 'untitled.js').toString())
          //         if (fileName === path.join(rootPath, 'untitled.js').toString()) {
          //           console.log('getText', getText())
          //           onCloseEvent.dispose()
          //           vscode.workspace.fs.unlink(path.join(rootPath, 'untitled.js').toString()) // FIXME: 지우는거 테스트
          //           resolve()
          //         }
          //       })
          //     })
          //     // onDidCloseTextDocument((arg) => { })
          //     // eol (get): ƒ eol(){return u._eol===`\n`?P.EndOfLine.LF:P.EndOfLine.CRLF}
          //     // fileName (get): ƒ fileName(){return u._uri.fsPath}
          //     // getText: ƒ getText(S){return S?u._getTextInRange(S):u.getText()}
          //     // getWordRangeAtPosition: ƒ getWordRangeAtPosition(S,w){return u._getWordRangeAtPosition(S,w)}
          //     // isClosed (get): ƒ isClosed(){return u._isDisposed}
          //     // isDirty (get): ƒ isDirty(){return u._isDirty}
          //     // isUntitled (get): ƒ isUntitled(){return u._uri.scheme===R.Schemas.untitled}
          //     // languageId (get): ƒ languageId(){return u._languageId}
          //     // lineAt: ƒ lineAt(S){return u._lineAt(S)}
          //     // lineCount (get): ƒ lineCount(){return u._lines.length}
          //     // notebook (get): ƒ notebook(){return u._notebook}
          //     // offsetAt: ƒ offsetAt(S){return u._offsetAt(S)}
          //     // positionAt: ƒ positionAt(S){return u._positionAt(S)}
          //     // save: ƒ save(){return u._save()}
          //     // uri (get): ƒ uri(){return u._uri}
          //     // validatePosition: ƒ validatePosition(S){return u._validatePosition(S)}
          //     // validateRange: ƒ validateRange(S){return u._validateRange(S)}
          //     // version (get): ƒ version(){return u._versionId}
          //     // __proto__: Object
          //     // length: 1
          //     // __proto__: Array(0)

          //   })

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

  toRegisterCommands.forEach(({ key, cmd }) => {
    const cmdInfo = ({ key })
    context.subscriptions.push(vscode.commands.registerCommand(`${EXT_NAME}.${key}`, async () => {
      try {
        await Promise.resolve().then(() => cmd.apply(null, [cmdInfo]))
        vscode.window.showInformationMessage(`${cmdInfo.key} complete.`)
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
