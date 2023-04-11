const hx = require('hbuilderx');
const fs = require("fs");
const path = require("path");
const {
    noSuchFOD,
    copyDone
} = require("./i18n")

function copy(filePath) {
    if (!fs.existsSync(filePath)) {
        hx.window.setStatusBarMessage(noSuchFOD(filePath), 1000, 'error');
        return;
    }
    const name = path.basename(filePath, path.extname(filePath));
    hx.env.clipboard.writeText(name).then(() => {
        hx.window.setStatusBarMessage(copyDone, 1000, 'info');
    });
}

module.exports = {
    copy
}