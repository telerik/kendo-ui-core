

namespace KendoUI.Mvc.UI
{
    using KendoUI.Mvc.UI.Html;
    
    public class EditorSeparator : IEditorTool
    {
        public IHtmlBuilder CreateHtmlBuilder()
        {
            return new EditorSeparatorHtmlBuilder(this);
        }
    }
}
