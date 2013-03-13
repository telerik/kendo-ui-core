function getSplitter(id) {
    return $(id || "#Splitter").data("kendoSplitter");
}

function getSplitterHtml(paneCount) {
    return "<div style='width: 207px;height:100px'>" +  new Array((paneCount + 1) || 3).join("<div/>") + "</div>";
}

var splitter, splitterObject;

function createSplitter(options, paneCount) {
    splitter = $(getSplitterHtml(paneCount || 2))
            .appendTo(document.body)
            .kendoSplitter(options);

    splitterObject = splitter.data("kendoSplitter");

    return splitter;
}

