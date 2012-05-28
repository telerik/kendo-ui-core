namespace Kendo.Mvc.UI
{
    public class EditorButton : IEditorTool
    {
        public EditorButton(string name)
        {
            Name = name;
        }

        public string Name { get; set; }
    }
}
