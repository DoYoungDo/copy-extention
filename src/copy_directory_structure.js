const hx = require('hbuilderx');
const fs = require("fs");
const path = require("path");
// 导入国际化词条
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

    // 获取配置项
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
    const dirFilter = config.get("bb.dir.name.filter.reg");
    const fileFilter = config.get("bb.file.name.filter.reg");
    const ignoreEmptyDir = config.get("b.is.ignore.empty.dir");
    const copyStructureLevel = Number(config.get("gg.copy.structure.level"));

    // 递归遍历目录
    let text = readDirGetStructureText(dirPath, true, "", 1);
    // 去除开头的换行符
    text = text.startsWith("\n") ? text.slice(1) : text;
    // 将组织的文本写入到剪切板
    hx.env.clipboard.writeText(text).then(() => {
        hx.window.setStatusBarMessage(copyDone, 1000, 'info');
    }).catch(() => {
        hx.window.setStatusBarMessage(copyFailed, 1000, 'error');
    });

    /* 递归遍历函数 */
    function readDirGetStructureText(dir, isEndOfDir, prefix, level) {
        let text = "";
        const dirName = path.basename(dir);

        // 忽略以.开头的目录
        if (!copyHideDir && dirName.startsWith(".")) {
            return text;
        }
        // 正则匹配
        else if (dirFilter && dirFilter.trim() && !dirName.match(new RegExp(dirFilter.trim()))) {
            return text;
        }
        // 追加目录项
        text += "\n";
        text += prefix; // 前缀（缩进填充）
        text += isEndOfDir ? char4 : char2; // 连接符
        text += dirName; // 目录名
        
        // 如果层级已经超过则不再继续复制
        if(copyStructureLevel !== -1 && level >= copyStructureLevel){
            return text;
        }

        // 获取所有子项
        const items = fs.readdirSync(dir);
        // 遍历子项
        items.forEach((item, index) => {
            // 忽略 . ..
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
                else if (fileFilter && fileFilter.trim() && !item.match(new RegExp(fileFilter.trim()))) {
                    return;
                }
                text += "\n";
                text += newPrefix;
                text += isEnd ? char4 : char2;
                text += item;
            }
            else {
                text += readDirGetStructureText(itemPath, isEnd, newPrefix, level + 1);
            }
        })

        // 如果忽略空目录的话将目录名称也清空
        if (ignoreEmptyDir) {
            if (items.length === 0 || (items.length === 2 && items.includes(".") && items.includes(".."))) {
                text = "";
            }
        }
        // 返回组织的文本
        return text.toString();
    }

    /* 获取缩进填充文本 */
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