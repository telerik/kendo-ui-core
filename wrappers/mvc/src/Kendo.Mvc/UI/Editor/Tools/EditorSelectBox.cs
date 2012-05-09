namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using System.Web.Mvc;
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.UI.Html;

    public class EditorSelectBox : IEditorListTool
    {
        public EditorSelectBox(string identifier, IList<DropDownItem> items)
        {
            Items = items;
            Identifier = identifier.ToCamelCase();
            HtmlAttributes = new Dictionary<string, object>() { { "class", "t-" + Identifier } };
        }

        public string Identifier { get; private set; }

        public ViewContext ViewContext { get; private set; }

        public IDictionary<string, object> HtmlAttributes { get; private set; }

        public IList<DropDownItem> Items
        {
            get;
            private set;
        }

        public IHtmlBuilder CreateHtmlBuilder()
        {
            return new EditorSelectBoxHtmlBuilder(this);
        }
    }
}
