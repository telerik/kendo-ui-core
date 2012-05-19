namespace Kendo.Mvc.UI.Html
{
    using Kendo.Mvc.Infrastructure;
    
    public class GridFilterCellDecorator : IGridCellBuilderDecorator
    {
        private readonly bool filtered;
        private readonly string filterText;

        public GridFilterCellDecorator(bool filtered, string filterText)
        {
            this.filtered = filtered;
            this.filterText = filterText;
        }

        public void Decorate(IHtmlNode td)
        {            
            td.AddClass("k-filterable");

            var link = new HtmlElement("a")
                .AddClass("k-grid-filter")
                .ToggleClass("k-active-filter", filtered);


            td.Children.Insert(0, link);

            var icon = new HtmlElement("span").AddClass("k-icon", "k-filter").Text(filterText);
            
            icon.AppendTo(link);
        }
    }
}
