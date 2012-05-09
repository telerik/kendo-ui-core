namespace Kendo.Mvc.UI
{
    using Kendo.Mvc.UI.Html;
    
    public class EditorSeparator : IEditorTool
    {
        public IHtmlBuilder CreateHtmlBuilder()
        {
            return new EditorSeparatorHtmlBuilder(this);
        }
    }
}
