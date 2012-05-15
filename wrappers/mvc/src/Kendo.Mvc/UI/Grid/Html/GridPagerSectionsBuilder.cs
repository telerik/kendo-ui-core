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
            var div = new HtmlElement("div")
                .AddClass("k-pager", UIPrimitives.ResetStyle, "k-numeric");

            pagingSectionsBuilder.CreateSections(section).AppendTo(div);
            return div;
        }
    }
}