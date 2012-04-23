
namespace KendoUI.Mvc.UI
{
    using KendoUI.Mvc.Extensions;
    using KendoUI.Mvc.Infrastructure;
    using KendoUI.Mvc.UI.Html;
    
    public class EditorButton : IEditorTool
    {
        public EditorButton(string text)
        {
            Guard.IsNotNullOrEmpty(text, "text");

            Text = text.ToCamelCase();
            CssClass = "t-" + Text;
        }

        public string Text
        {
            get;
            set;
        }
        
        public string CssClass
        {
            get;
            set;
        }

        public IHtmlBuilder CreateHtmlBuilder()
        {
            return new EditorButtonHtmlBuilder(this);
        }
    }
}
