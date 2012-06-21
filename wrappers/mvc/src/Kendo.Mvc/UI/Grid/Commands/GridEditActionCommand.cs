namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Resources;
    using Kendo.Mvc.UI.Html;
    using System.Linq;

    public class GridEditActionCommand : GridActionCommandBase
    {
        public GridEditActionCommand()
        {            
            UpdateText = Messages.Grid_Update;
            Text = Messages.Grid_Edit;
            CancelText = Messages.Grid_Cancel;
        }

        private const string DefaultUpdateText = "Update";
        private const string DefaultEditText = "Edit";
        private const string DefaultCancelText = "Cancel";

        public string UpdateText { get; set; }

        public string CancelText { get; set; }        

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

            var texts = new Dictionary<string, object>();

            FluentDictionary.For(texts)
                .Add("cancel", CancelText, () => CancelText.HasValue() && CancelText != DefaultCancelText)
                .Add("update", UpdateText, () => UpdateText.HasValue() && UpdateText != DefaultUpdateText)
                .Add("edit", Text, () => Text.HasValue() && Text != DefaultEditText);

            if (texts.Any())
	        {
		        result["text"] = texts;
            }
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

            var insertButton = CreateButton<GridButtonBuilder>(UpdateText, UIPrimitives.Grid.Insert);
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
