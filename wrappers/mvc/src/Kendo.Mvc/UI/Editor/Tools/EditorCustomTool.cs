namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;

    public class EditorCustomTool : IEditorTool
    {
        public EditorCustomTool()
        {
            HtmlAttributes = new Dictionary<string, object>();
            Template = new HtmlTemplate();
        }

        public HtmlTemplate Template
        {
            get;
            private set;
        }

        public IDictionary<string, object> HtmlAttributes
        {
            get;
            private set;
        }

        public string Name { get; set; }
    }
}
