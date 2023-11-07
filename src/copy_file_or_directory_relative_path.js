const hx = require('hbuilderx');
const fs = require("fs");
const path = require("path");
const {
	noSuchFOD,
	copyDone
} = require("./i18n")

function copy(workspaceFolder, filePath) {
	if (!fs.existsSync(filePath))
	{
		hx.window.setStatusBarMessage(noSuchFOD(filePath), 1000, 'error');
		return;
	}
    let relativePath = path.relative(workspaceFolder.uri.fsPath,filePath);
    
    const config = hx.workspace.getConfiguration()
    const is = config.get("b.is.escape.backslashes");
    if(is){
        relativePath = relativePath.replace(/\\/g,"/");
    }
    
	hx.env.clipboard.writeText(relativePath).then(() => {
		hx.window.setStatusBarMessage(copyDone, 1000, 'info');
	});
}

module.exports = {
	copy
}
