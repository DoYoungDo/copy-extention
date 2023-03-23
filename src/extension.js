const hx = require('hbuilderx');

//该方法将在插件激活的时候调用
function activate(context) {
	let disposable = hx.commands.registerCommand('copy.directory.structure', (param) => {
		const {
			copy
		} = require("./copy_directory_structure");
		copy(param.fsPath);
	});

	let disposable1 = hx.commands.registerCommand('copy.file.or.directroy.path', (param) => {
		const {
			copy
		} = require("./copy_file_or_directory_path");
		copy(param.fsPath);
	});
	
	//订阅销毁钩子，插件禁用的时候，自动注销该command。
	context.subscriptions.push(disposable, disposable1);
}
//该方法将在插件禁用的时候调用（目前是在插件卸载的时候触发）
function deactivate() {

}
module.exports = {
	activate,
	deactivate
}
