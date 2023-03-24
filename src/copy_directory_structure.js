const hx = require('hbuilderx');
const fs = require("fs");
const path = require("path");
const {
	noSuchFOD,
	notDir,
	copyDone,
	copyFailed
} = require("./i18n")

function copy(dirPath) {
	if (!fs.existsSync(dirPath)) {
		hx.window.setStatusBarMessage(noSuchFOD(dirPath), 1000, 'error');
		return;
	}

	if (!fs.statSync(dirPath).isDirectory()) {
		hx.window.setStatusBarMessage(notDir, 1000, 'error');
		return;
	}

	const config = hx.workspace.getConfiguration()
	const indent = config.get("f.indent.lenght");
	const copyHideDir = config.get("a.is.copy.hide.dir");
	const copyHideFile = config.get("b.is.copy.hide.file");
	// const char1 = "┌─";
	// const char2 = "├─";
	// const char3 = "│    ";
	// const char4 = "└─";
	// const char5 = "    ";
	const char1 = "┌─";
	const char2 = config.get("c.item.connect.charactor");
	const char3 = config.get("d.sibling.item.connect.charactor").charAt(0) + getIndetText(indent);
	const char4 = config.get("e.tail.item.connect.charactor");
	const char5 = getIndetText(indent);

	let text = readDirGetStructureText(dirPath, true, "");
	text = text.startsWith("\n") ? text.slice(1) : text;
	hx.env.clipboard.writeText(text).then(() => {
		hx.window.setStatusBarMessage(copyDone, 1000, 'info');
	}).catch(() => {
		hx.window.setStatusBarMessage(copyFailed, 1000, 'error');
	});

	function readDirGetStructureText(dir, isEndOfDir, prefix) {
		let text = "";
		const dirName = path.basename(dir);

		if (!copyHideDir && dirName.startsWith(".")) {
			return text;
		}
		text += "\n";
		text += prefix;
		text += isEndOfDir ? char4 : char2;
		text += dirName;

		const items = fs.readdirSync(dir);
		items.forEach((item, index) => {
			if (item === "." || item === "..") {
				return;
			}

			const isEnd = index === items.length - 1;
			const newPrefix = prefix + (isEndOfDir ? char5 : char3);

			const itemPath = path.join(dir, item);
			if (!fs.statSync(itemPath).isDirectory()) {
				if (!copyHideFile && item.startsWith(".")) {
					return;
				}
				text += "\n";
				text += newPrefix;
				text += isEnd ? char4 : char2;
				text += item;
			}
			else {
				text += readDirGetStructureText(itemPath, isEnd, newPrefix);
			}
		})
		return text.toString();
	}

	function getIndetText(indent) {
		let text = "";
		const fillCharactor = config.get("g.indent.fill.charactor").trim().charAt(0) || " ";

		for (let i = 0; i < indent; ++i) {
			text += fillCharactor;
		}
		return text.toString();
	}
}

module.exports = {
	copy
}
