

namespace KendoUI.Mvc.UI.Html
{
    using KendoUI.Mvc.Infrastructure;
    
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
            var wrapper = new HtmlElement("div")
                .AddClass("t-grid-filter", "t-state-default")
                .ToggleClass("t-active-filter", filtered);

            wrapper.AppendTo(td);

            var icon = new HtmlElement("span").AddClass("t-icon", "t-filter").Text(filterText);
            
            icon.AppendTo(wrapper);
        }
    }
}
