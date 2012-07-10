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
            Exec = new ClientHandlerDescriptor();
        }

        public string Name { get; set; }
        public string ToolTip { get; set; }
        public ClientHandlerDescriptor Exec { get; set; }
    }
}