namespace KendoUI.Mvc.UI
{
    using System.Collections.Generic;
    using KendoUI.Mvc.UI.Html;

    public class GridSelectActionCommand : GridActionCommandBase
    {
        public override string Name
        {
            get { return "select"; }
        }

        public override IEnumerable<IGridButtonBuilder> CreateDisplayButtons(IGridLocalization localization, IGridUrlBuilder urlBuilder, IGridHtmlHelper htmlHelper)
        {
            var button = CreateButton<GridLinkButtonBuilder>(Text ?? localization.Select, UIPrimitives.Grid.Select);
            
            button.SpriteCssClass = "t-select";
            button.Url = urlBuilder.SelectUrl;

            return new[] { button };
        }
    }
}
