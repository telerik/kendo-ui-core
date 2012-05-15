namespace Kendo.Mvc.UI
{
    using Kendo.Mvc.UI.Html;

    public class EditorBreak : IEditorTool
    {
        public IHtmlBuilder CreateHtmlBuilder()
        {
            return new EditorBreakHtmlBuilder();
        }
    }
}
