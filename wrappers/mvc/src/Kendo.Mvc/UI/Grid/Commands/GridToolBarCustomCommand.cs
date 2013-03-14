namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.UI.Html;
    using System.Text.RegularExpressions;

    public class GridToolBarCustomCommand<T> : GridCustomCommandBase where T : class
    {
        public override IEnumerable<IGridButtonBuilder> CreateDisplayButtons(IGridUrlBuilder urlBuilder, IGridHtmlHelper htmlHelper)
        {
            var button = CreateButton<GridLinkButtonBuilder>(Text, CssClass());

            button.Url = delegate { return Encode(urlBuilder.Url(this)); };
            
            return new[] { button };
        }

        private string Encode(string value)
        {
            if (!string.IsNullOrEmpty(value))
            {
                value = Regex.Replace(value, "(%20)*%23%3D(%20)*", "#=", RegexOptions.IgnoreCase);
                value = Regex.Replace(value, "(%20)*%23(%20)*", "#", RegexOptions.IgnoreCase);
                value = Regex.Replace(value, "(%20)*%24%7B(%20)*", "${", RegexOptions.IgnoreCase);
                value = Regex.Replace(value, "(%20)*%7D(%20)*", "}", RegexOptions.IgnoreCase);
            }

            return value;
        }
    }
}
