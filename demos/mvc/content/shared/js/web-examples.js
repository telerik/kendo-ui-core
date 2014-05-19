$(function() {
    populateSearchDataSource(desktopExamples);

    $("#search").on("input", function() {
        searchExamplesFor($(this).val(), product);
    });

    $("#search-results").kendoMobileListView({
       dataSource: searchDataSource,
       template: '<a href="../#: url #"> #: text # <span class="section">#: section #</span> </a>',
       dataBinding: function(e) {
            if (!searchDataSource.filter()) {
                e.preventDefault();
                this.replace([]);
            }
        }
    });
});
