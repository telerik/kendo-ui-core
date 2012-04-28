namespace KendoUI.Mvc.UI
{
    using KendoUI.Mvc.UI.Html;

    public class EditorBreak : IEditorTool
    {
        public IHtmlBuilder CreateHtmlBuilder()
        {
            return new EditorBreakHtmlBuilder(this);
        }
    }
}
