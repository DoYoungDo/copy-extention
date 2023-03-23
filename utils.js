const path = require('path');
const fs = require('fs');

//单独文件处理
let singleFiles = (function() {
	return ['package-lock.json', 'package.nls.en.json',
		'package.nls.json', 'package.nls.zh-cn.json'
	].map(fileName => {
		return {
			from: path.resolve(__dirname, fileName),
			to: "."
		}
	})
})();

// 处理package中入口文件的位置
function handleMain(content) {
	let contentObj = JSON.parse(content.toString());
	contentObj.main = "./extension.js";
	return JSON.stringify(contentObj);
}

const pkgPath = path.join(__dirname, 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
const bundleId = `${pkg.displayName}.${pkg.name}`;

module.exports = {
	bundleId,
	singleFiles,
	handleMain
}