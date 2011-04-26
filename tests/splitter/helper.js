function getSplitter(id) {
    return $(id || "#Splitter").data("kendoSplitter");
}

function getSplitterHtml(paneCount) {
    return "<div style='width: 207px;height:100px'>" +  new Array((paneCount + 1) || 3).join("<div/>") + "</div>";
}
