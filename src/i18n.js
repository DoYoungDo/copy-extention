const nls = require('hxnls');
let localize = nls.loadMessageBundle();

module.exports = {
	noSuchFOD: (path) => {
		return localize("no.such.file.or.Directory", "没有这个文件或目录:{0}", path);
	},
	notDir: localize("not.dir", "不是一个目录"),
	copyDone: localize("copy.done", "复制成功"),
	copyFailed: localize("copy.failed", "复制失败")
}
