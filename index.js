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

/**
 * Dynamically resize image maps to match the adjusted size of the image
 * 
 * 		if (document.readyState == 'complete') {
 *			mapResizer();
 *		} else {
 *			window.addEventListener('load', () => mapResizer());
 *		}
 * 
 * @param {*} maps Maps to resize. Defaults to all maps 
 */
module.exports.mapResizer = (maps) => {
    if (!maps) {maps = document.getElementsByTagName('map');}
    for (const map of maps) {
        map.img = document.querySelectorAll(`[usemap="#${map.name}"]`)[0];
        map.areas = map.getElementsByTagName('area');
        for (const area of map.areas) {
            area.coordArr = area.coords.split(',');
        }
    }
    function resizeMaps() {
        for (const map of maps) {
            const scale = map.img.offsetWidth / (map.img.naturalWidth || map.img.width);
            for (const area of map.areas) {
                area.coords = area.coordArr.map(coord => Math.round(coord * scale)).join(',');
            }
        }
    }
    window.addEventListener('resize', () => resizeMaps());
    resizeMaps();
}