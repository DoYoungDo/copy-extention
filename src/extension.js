const hx = require('hbuilderx');

//该方法将在插件激活的时候调用
function activate(context) {
    //订阅销毁钩子，插件禁用的时候，自动注销该command。
    context.subscriptions.push(hx.commands.registerCommand('copy.directory.structure', (param) => {
        const {
            copy
        } = require("./copy_directory_structure");
        copy(param.fsPath);
    }));

    context.subscriptions.push(hx.commands.registerCommand('copy.file.or.directroy.path', (param) => {
        const {
            copy
        } = require("./copy_file_or_directory_path");
        copy(param.fsPath);
    }));

    context.subscriptions.push(hx.commands.registerCommand('copy.file.or.directroy.full.name', (param) => {
        const {
            copy
        } = require("./copy_file_or_directory_full_name");
        copy(param.fsPath);
    }));

    context.subscriptions.push(hx.commands.registerCommand('copy.file.name.without.extension.name', (param) => {
        const {
            copy
        } = require("./copy_file_name_without_extension_name");
        copy(param.fsPath);
    }));
    
    context.subscriptions.push(hx.commands.registerCommand('copy.file.or.directory.relative.path', (param) => {
        const {
            copy
        } = require("./copy_file_or_directory_relative_path");
        copy(param.workspaceFolder, param.fsPath);
    }));    
}
//该方法将在插件禁用的时候调用（目前是在插件卸载的时候触发）
function deactivate() {

}
module.exports = {
    activate,
    deactivate
}