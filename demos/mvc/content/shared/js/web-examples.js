$(function () {
    populateSearchDataSource(desktopExamples);

    $("#example-search").kendoExampleSearch({
        product: product,
        minLength: 3,
        template: '<a href="#: path + url #"> #: text # <span class="section">#: section #</span> </a>',
        dataTextField: "text",
        select: function (e) {
            location.href = e.item.find("a").attr("href");
        }
    });
});
