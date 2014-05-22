$(function() {
    populateSearchDataSource(desktopExamples);

    $("#example-search").on("input", function() {
        searchExamplesFor($(this).val(), product);
    });

    $("#search-results").kendoMobileListView({
       dataSource: searchDataSource,
       template: '<a href="#: path + url #"> #: text # <span class="section">#: section #</span> </a>',
       dataBinding: function(e) {
            if (!searchDataSource.filter()) {
                e.preventDefault();
                this.replace([]);
            }
        }
    });
});
