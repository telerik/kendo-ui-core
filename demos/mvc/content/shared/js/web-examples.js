$(function () {
    populateSearchDataSource(desktopExamples);

    $("#example-search").kendoExampleSearch({
        product: product,
        minLength: 3,
        template: '<a href="#: path + url #"><span class="section">#: section #</span> <span class="demo-name"> #: text # </span></a>',
        dataTextField: "text",
        select: function (e) {
            location.href = e.item.find("a").attr("href");
        },
        height: 300
    });
});
