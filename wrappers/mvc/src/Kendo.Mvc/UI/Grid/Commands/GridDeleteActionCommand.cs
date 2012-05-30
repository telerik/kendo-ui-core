namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.UI.Html;

    public class GridDeleteActionCommand : GridActionCommandBase
    {
        public override string Name
        {
            get { return "destroy"; }
        }

        public override IEnumerable<IGridButtonBuilder> CreateDisplayButtons(IGridLocalization localization, IGridUrlBuilder urlBuilder, IGridHtmlHelper htmlHelper)
        {
            var deleteButton = CreateButton<GridFormButtonBuilder>(Text ?? localization.Delete, UIPrimitives.Grid.Delete);

            deleteButton.Url = urlBuilder.DeleteUrl;

            deleteButton.HtmlHelper = htmlHelper;

            deleteButton.SpriteCssClass = "k-delete";

            return new[] { deleteButton };
        }
    }
}
