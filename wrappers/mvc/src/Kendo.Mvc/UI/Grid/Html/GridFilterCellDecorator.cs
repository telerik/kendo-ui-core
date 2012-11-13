namespace Kendo.Mvc.UI.Html
{
    public class GridFilterCellDecorator : IGridCellBuilderDecorator
    {
        private readonly bool filtered;

        public GridFilterCellDecorator(bool filtered)
        {
            this.filtered = filtered;
        }

        public void Decorate(IHtmlNode td)
        {            
            td.AddClass("k-filterable");

            var link = new HtmlElement("a")
                .AddClass("k-grid-filter")
                .ToggleClass("k-state-active", filtered);


            td.Children.Insert(0, link);

            new HtmlElement("span").AddClass("k-icon", "k-filter").AppendTo(link);
        }
    }
}
