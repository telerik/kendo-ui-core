namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.Resources;
    using Kendo.Mvc.UI.Html;

    public class GridToolBarExcelCommand<T> : GridToolBarCommandBase<T> where T : class
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

        public GridToolBarExcelCommand()
        {
            Text = Messages.Grid_Excel;
        }

        public override IEnumerable<IGridButtonBuilder> CreateDisplayButtons(IGridUrlBuilder urlBuilder, IGridHtmlHelper htmlHelper)
        {
            var factory = new GridButtonFactory();
            var button = factory.CreateButton<ButtonBuilder>(ButtonType);

            button.CssClass += " k-grid-excel";
            button.SpriteCssClass = "k-i-excel";
            button.Text = Text;
            button.HtmlAttributes = HtmlAttributes;

            return new[] { button };
        }
    }
}
