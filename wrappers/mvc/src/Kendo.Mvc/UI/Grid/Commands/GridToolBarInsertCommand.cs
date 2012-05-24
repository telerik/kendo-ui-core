namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.UI.Html;

    public class GridToolBarInsertCommand<T> : GridToolBarCommandBase<T> where T : class
    {
        public override IEnumerable<IGridButtonBuilder> CreateDisplayButtons(IGridLocalization localization, IGridUrlBuilder urlBuilder, IGridHtmlHelper htmlHelper)
        {
            var factory = new GridButtonFactory();
            var button = factory.CreateButton<GridLinkButtonBuilder>(ButtonType);

            button.CssClass += " " + UIPrimitives.Grid.Add;
            button.SpriteCssClass = "k-add";
            button.Text = Text ?? localization.AddNew;
            //TODO: Implement command button html attributes
            //button.HtmlAttributes = HtmlAttributes;
            //button.ImageHtmlAttributes = ImageHtmlAttributes;
            button.Url = urlBuilder.AddUrl;

            return new[] { button };
        }
    }
}
