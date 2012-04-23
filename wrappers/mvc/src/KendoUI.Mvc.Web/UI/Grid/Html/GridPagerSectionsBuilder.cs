
namespace KendoUI.Mvc.UI.Html
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
                .AddClass("t-pager", UIPrimitives.ResetStyle);

            pagingSectionsBuilder.CreateSections(section).AppendTo(div);
            return div;
        }
    }
}