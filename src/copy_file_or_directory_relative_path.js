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
    const relativePath = path.relative(workspaceFolder.uri.fsPath,filePath);
	hx.env.clipboard.writeText(relativePath).then(() => {
		hx.window.setStatusBarMessage(copyDone, 1000, 'info');
	});
}

module.exports = {
	copy
}
