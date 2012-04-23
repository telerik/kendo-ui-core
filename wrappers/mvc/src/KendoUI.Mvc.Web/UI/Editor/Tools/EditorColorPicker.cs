

namespace KendoUI.Mvc.UI
{
    using System.Collections.Generic;
    using KendoUI.Mvc.Extensions;
    using KendoUI.Mvc.UI.Html;

    public class EditorColorPicker : IEditorTool
    {
        public EditorColorPicker(string identifier)
        {
            Identifier = identifier.ToCamelCase();
            HtmlAttributes = new Dictionary<string, object>() { { "class", "t-" + Identifier } };
        }

        public string Identifier { get; private set; }

        public IDictionary<string, object> HtmlAttributes { get; private set; }

        public IHtmlBuilder CreateHtmlBuilder()
        {
            return new EditorColorPickerHtmlBuilder(this);
        }
    }
}
