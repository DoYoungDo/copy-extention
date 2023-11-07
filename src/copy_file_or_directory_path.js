const hx = require('hbuilderx');
const fs = require("fs");
const path = require("path");
const {
	noSuchFOD,
	copyDone
} = require("./i18n")

function copy(filePath) {
	if (!fs.existsSync(filePath))
	{
		hx.window.setStatusBarMessage(noSuchFOD(filePath), 1000, 'error');
		return;
	}
    const config = hx.workspace.getConfiguration()
    const is = config.get("b.is.escape.backslashes");
    if(is){
        filePath = filePath.replace(/\\/g,"/");
    }
    
	hx.env.clipboard.writeText(filePath).then(() => {
		hx.window.setStatusBarMessage(copyDone, 1000, 'info');
	});
}

module.exports = {
	copy
}
