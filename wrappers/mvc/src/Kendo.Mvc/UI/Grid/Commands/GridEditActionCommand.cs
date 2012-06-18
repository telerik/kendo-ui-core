namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Resources;
    using Kendo.Mvc.UI.Html;

    public class GridEditActionCommand : GridActionCommandBase
    {
        public GridEditActionCommand()
        {
            InsertText = Messages.Grid_Update;
            UpdateText = Messages.Grid_Update;
            Text = Messages.Grid_Edit;
            CancelText = Messages.Grid_Cancel;
        }

        public string UpdateText { get; set; }

        public string CancelText { get; set; }

        public string InsertText { get; set; }

        public override string Name
        {
            get { return "edit"; }
        }

        public override IEnumerable<IGridButtonBuilder> CreateDisplayButtons(IGridUrlBuilder urlBuilder, IGridHtmlHelper htmlHelper)
        {
            var editButton = CreateButton<GridLinkButtonBuilder>(Text, UIPrimitives.Grid.Edit);

            editButton.Url = urlBuilder.EditUrl;

            editButton.SpriteCssClass = "k-edit";

            return new[]
            {
                editButton
            };
        }

        public override IDictionary<string, object> Serialize(IGridUrlBuilder urlBuilder)
        {
            var result = base.Serialize(urlBuilder);

            FluentDictionary.For(result)
                .Add("cancelText", CancelText, (System.Func<bool>)CancelText.HasValue)
                .Add("updateText", UpdateText, (System.Func<bool>)UpdateText.HasValue)
                .Add("insertText", InsertText, (System.Func<bool>)InsertText.HasValue);

            return result;
        }

        public override IEnumerable<IGridButtonBuilder> CreateEditButtons(IGridUrlBuilder urlBuilder, IGridHtmlHelper htmlHelper)
        {
            var cancelButton = CreateButton<GridLinkButtonBuilder>(CancelText, UIPrimitives.Grid.Cancel);

            cancelButton.Url = urlBuilder.CancelUrl;
            
            cancelButton.SpriteCssClass = "k-cancel";

            var updateButton = CreateButton<GridButtonBuilder>(UpdateText, UIPrimitives.Grid.Update);
            updateButton.ShouldAppendDataKeys = true;
            updateButton.SpriteCssClass = "k-update";
            updateButton.HtmlHelper = htmlHelper;

            return new IGridButtonBuilder[]
            {
                updateButton,
                cancelButton
            };
        }

        public override IEnumerable<IGridButtonBuilder> CreateInsertButtons(IGridUrlBuilder urlBuilder, IGridHtmlHelper htmlHelper)
        {
            var cancelButton = CreateButton<GridLinkButtonBuilder>(CancelText, UIPrimitives.Grid.Cancel);

            cancelButton.Url = urlBuilder.CancelUrl;

            cancelButton.SpriteCssClass = "k-cancel";

            var insertButton = CreateButton<GridButtonBuilder>(InsertText, UIPrimitives.Grid.Insert);
            insertButton.SpriteCssClass = "k-insert";
            insertButton.HtmlHelper = htmlHelper;

            return new IGridButtonBuilder[]
            {
                insertButton,
                cancelButton
            };
        }
    }
}
