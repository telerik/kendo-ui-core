/**
 * File Utils Service - provides file-related utilities
 
 */
export class FileUtilsService {
    constructor($, support, inputService) {
        this.$ = $;
        this.support = support;
        this.inputService = inputService;
        this._fileGroupMap = this.createFileGroupMap();
        this.fileSaver = document.createElement("a");
        this.downloadAttribute = "download" in this.fileSaver && !this.support.browser.edge;
    }
    /**
     * Create the default file group mapping
     */
    createFileGroupMap() {
        return {
            audio: [".aif", ".iff", ".m3u", ".m4a", ".mid", ".mp3", ".mpa", ".wav", ".wma", ".ogg", ".wav", ".wma", ".wpl"],
            video: [".3g2", ".3gp", ".avi", ".asf", ".flv", ".m4u", ".rm", ".h264", ".m4v", ".mkv", ".mov", ".mp4", ".mpg",
                ".rm", ".swf", ".vob", ".wmv"],
            image: [".ai", ".dds", ".heic", ".jpe", "jfif", ".jif", ".jp2", ".jps", ".eps", ".bmp", ".gif", ".jpeg",
                ".jpg", ".png", ".ps", ".psd", ".svg", ".svgz", ".tif", ".tiff"],
            txt: [".doc", ".docx", ".log", ".pages", ".tex", ".wpd", ".wps", ".odt", ".rtf", ".text", ".txt", ".wks"],
            presentation: [".key", ".odp", ".pps", ".ppt", ".pptx"],
            data: [".xlr", ".xls", ".xlsx"],
            programming: [".tmp", ".bak", ".msi", ".cab", ".cpl", ".cur", ".dll", ".dmp", ".drv", ".icns", ".ico", ".link",
                ".sys", ".cfg", ".ini", ".asp", ".aspx", ".cer", ".csr", ".css", ".dcr", ".htm", ".html", ".js",
                ".php", ".rss", ".xhtml"],
            pdf: [".pdf"],
            config: [".apk", ".app", ".bat", ".cgi", ".com", ".exe", ".gadget", ".jar", ".wsf"],
            zip: [".7z", ".cbr", ".gz", ".sitx", ".arj", ".deb", ".pkg", ".rar", ".rpm", ".tar.gz", ".z", ".zip", ".zipx"],
            "disc-image": [".dmg", ".iso", ".toast", ".vcd", ".bin", ".cue", ".mdf"]
        };
    }
    /**
     * Get the file group mapping
     */
    get fileGroupMap() {
        return this._fileGroupMap;
    }
    /**
     * Get file group/type based on extension
     */
    getFileGroup(extension, withPrefix) {
        const fileTypeMap = this._fileGroupMap;
        const groups = Object.keys(fileTypeMap);
        const type = "file";
        if (extension === undefined || !extension.length) {
            return type;
        }
        let normalizedExt = extension.toLowerCase();
        if (!normalizedExt.startsWith(".")) {
            normalizedExt = "." + normalizedExt;
        }
        for (let i = 0; i < groups.length; i += 1) {
            const extensions = fileTypeMap[groups[i]];
            if (extensions.indexOf(normalizedExt) > -1) {
                return withPrefix ? "file-" + groups[i] : groups[i];
            }
        }
        return type;
    }
    /**
     * Get human-readable file size message
     */
    getFileSizeMessage(size) {
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (size === 0) {
            return '0 Byte';
        }
        const i = parseInt(String(Math.floor(Math.log(size) / Math.log(1024))), 10);
        return Math.round(size / Math.pow(1024, i)) + ' ' + sizes[i];
    }
    /**
     * Post data to a proxy URL
     */
    postToProxy(dataURI, fileName, proxyURL, proxyTarget) {
        const $ = this.$;
        const form = $("<form>").attr({
            action: proxyURL,
            method: "POST",
            target: proxyTarget
        });
        const data = this.inputService.antiForgeryTokens();
        data.fileName = fileName;
        const parts = dataURI.split(";base64,");
        data.contentType = parts[0].replace("data:", "");
        data.base64 = parts[1];
        for (const name in data) {
            if (Object.prototype.hasOwnProperty.call(data, name)) {
                $('<input>').attr({
                    value: data[name],
                    name: name,
                    type: "hidden"
                }).appendTo(form);
            }
        }
        form.appendTo("body").submit().remove();
    }
    /**
     * Save using msSaveBlob (IE)
     */
    saveAsBlob(dataURI, fileName) {
        let blob = dataURI; // could be a Blob object
        if (typeof dataURI === "string") {
            const parts = dataURI.split(";base64,");
            const contentType = parts[0];
            const base64 = atob(parts[1]);
            const array = new Uint8Array(base64.length);
            for (let idx = 0; idx < base64.length; idx++) {
                array[idx] = base64.charCodeAt(idx);
            }
            blob = new Blob([array.buffer], { type: contentType });
        }
        navigator.msSaveBlob(blob, fileName);
    }
    /**
     * Save using data URI and download attribute
     */
    saveAsDataURI(dataURI, fileName) {
        let uri = dataURI;
        if (window.Blob && dataURI instanceof Blob) {
            uri = URL.createObjectURL(dataURI);
        }
        this.fileSaver.download = fileName;
        this.fileSaver.href = uri;
        const e = document.createEvent("MouseEvents");
        e.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        this.fileSaver.dispatchEvent(e);
        setTimeout(function () {
            URL.revokeObjectURL(uri);
        });
    }
    /**
     * Save data as a file download
     */
    saveAs(options) {
        let save = this.postToProxy.bind(this);
        if (!options.forceProxy) {
            if (this.downloadAttribute) {
                save = this.saveAsDataURI.bind(this);
            }
            else if (navigator.msSaveBlob) {
                save = this.saveAsBlob.bind(this);
            }
        }
        save(options.dataURI, options.fileName, options.proxyURL, options.proxyTarget);
    }
}
