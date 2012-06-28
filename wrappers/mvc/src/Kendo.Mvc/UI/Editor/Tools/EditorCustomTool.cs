namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;

    public class EditorCustomTemplateTool : IEditorTool
    {
        public EditorCustomTemplateTool()
        {
        }

        public string Name { get; set; }
        public string Template { get; set; }
    }

    public class EditorCustomButtonTool : IEditorTool
    {
        public EditorCustomButtonTool()
        {
            Exec = new ClientEvent();
            //HtmlAttributes = new Dictionary<string, object>();
        }

        //public IDictionary<string, object> HtmlAttributes
        //{
        //    get;
        //    private set;
        //}

        public string Name { get; set; }
        public string ToolTip { get; set; }
        public ClientEvent Exec { get; set; }
    }
}