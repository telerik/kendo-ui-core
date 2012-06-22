namespace Kendo.Mvc.UI
{
    public class EditorTool : IEditorTool
    {
        public EditorTool(string name)
        {
            Name = name;
        }

        public string Name { get; set; }
    }
}