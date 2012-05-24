namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.UI.Html;

    public class GridToolBarCustomCommand<T> : GridCustomCommandBase where T : class
    {
        public override IEnumerable<IGridButtonBuilder> CreateDisplayButtons(IGridLocalization localization, IGridUrlBuilder urlBuilder, IGridHtmlHelper htmlHelper)
        {
            var button = CreateButton<GridLinkButtonBuilder>(Text, CssClass());

            //TODO: Implement custom command routing
            //button.Url = delegate { return urlBuilder.Url(this); };
            button.Url = delegate { return ""; };
            return new[] { button };
        }
    }
}
