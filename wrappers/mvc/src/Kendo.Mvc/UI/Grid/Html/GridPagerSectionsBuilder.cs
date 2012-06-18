namespace Kendo.Mvc.UI.Html
{
    class GridPagerSectionsBuilder : IGridPagerSectionsBuilder
    {
        private readonly IGridPagerPagingSectionsBuilder pagingSectionsBuilder;

        public GridPagerSectionsBuilder(IGridPagerPagingSectionsBuilder pagingSectionsBuilder)
        {
            this.pagingSectionsBuilder = pagingSectionsBuilder;
        }

        public IHtmlNode CreateSections(GridPagerData section)
        {
            var fragment = new HtmlFragment();

            pagingSectionsBuilder.CreateSections(section).AppendTo(fragment);

            return fragment;
        }
    }
}