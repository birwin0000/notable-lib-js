module.exports.loadCSS = (url, resolve, reject) => {
    return new Promise(() => {
        if (!url) {
            if (reject) {
                reject();
            } else {
                throw("Could not create stylesheet without valid URL");
            }
        }
        let link = document.createElement("link");
        if (link && document && document.getElementsByTagName) {
            link.rel = "stylesheet";
            link.type = "text/css";
            link.href=url;
            link.onload = function() {
                if (resolve) {
                    resolve();
                }
            };
            link.onerror = function() {
                if (reject) {
                    reject();
                }
            };
            let head = document.getElementsByTagName("head");
            if (head && head.length > 0) {
                head[0].appendChild(link);
            }
        } else {
            if (reject) {
                reject();
            } else {
                throw("Could not create link Element on document");
            }
        }
    });
};

module.exports.copyToClipboard = (strToCopy) => {
    var tarea = document.createElement("textarea");
    tarea.value = strToCopy;
    tarea.focus();
    tarea.select();
    document.execCommand('copy');
    document.removeChild(tarea);
}