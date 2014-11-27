namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.Resources;
    using Kendo.Mvc.UI.Html;

    public class GridToolBarPdfCommand<T> : GridToolBarCommandBase<T> where T : class
    {
        class ButtonBuilder : GridButtonBuilderBase
        {
            protected override string ButtonTagName
            {
                get 
                { 
                    return "button"; 
                }
            }
        }

        public GridToolBarPdfCommand()
        {
            Text = Messages.Grid_Pdf;
        }

        public override IEnumerable<IGridButtonBuilder> CreateDisplayButtons(IGridUrlBuilder urlBuilder, IGridHtmlHelper htmlHelper)
        {
            var factory = new GridButtonFactory();
            var button = factory.CreateButton<ButtonBuilder>(ButtonType);

            button.CssClass += " k-grid-pdf";
            button.SpriteCssClass = "k-i-pdf";
            button.Text = Text;
            button.HtmlAttributes = HtmlAttributes;

            return new[] { button };
        }
    }
}
