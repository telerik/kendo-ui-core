namespace Kendo.Mvc.UI
{
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
        }

        public string Name { get; set; }
        public string ToolTip { get; set; }
        public ClientEvent Exec { get; set; }
    }
}