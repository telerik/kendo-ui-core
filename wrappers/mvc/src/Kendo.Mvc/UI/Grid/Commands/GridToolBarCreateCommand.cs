namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.Resources;
    using Kendo.Mvc.UI.Html;

    public class GridToolBarCreateCommand<T> : GridToolBarCommandBase<T> where T : class
    {
        public GridToolBarCreateCommand()
        {
            Text = Messages.Grid_Create;
        }
        public override IEnumerable<IGridButtonBuilder> CreateDisplayButtons(IGridUrlBuilder urlBuilder, IGridHtmlHelper htmlHelper)
        {
            var factory = new GridButtonFactory();
            var button = factory.CreateButton<GridLinkButtonBuilder>(ButtonType);

            button.CssClass += " " + UIPrimitives.Grid.Add;
            button.SpriteCssClass = "k-add";
            button.Text = Text;            
            button.HtmlAttributes = HtmlAttributes;
            //TODO: Implement command button image html attributes
            //button.ImageHtmlAttributes = ImageHtmlAttributes;
            button.Url = urlBuilder.AddUrl;

            return new[] { button };
        }
    }
}
