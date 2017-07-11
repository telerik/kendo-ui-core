var KB_DEFAULT_QUERY = 'knowledge-base';

$(document).ready(function () {
    var footer = $("#feedback-section").height() + $("footer").height() + 40
    var windowHeight = $(window).height();
    $("#page-article").css("min-height", windowHeight - 121 - footer);
})

function searchInternal() {
    search();

    $("#page-search .gsc-input-box .gsc-input").val("");
    $("#page-search table.gsc-above-wrapper-area-container > tbody > tr > td.gsc-result-info-container").append("<h2 id='latest-articles'>Last Updated Articles</h2>");
}

function onSearchInternal() {
    $("#latest-articles").hide();
    $("#page-search .gsc-result-info").show();
}