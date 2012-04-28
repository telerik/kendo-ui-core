namespace KendoUI.Mvc.UI.Html
{
    using KendoUI.Mvc.Infrastructure;
    
    public class EditorButtonHtmlBuilder : HtmlBuilderBase
    {
        private readonly EditorButton button;

        public EditorButtonHtmlBuilder(EditorButton button)
        {
            this.button = button;
        }

        protected override IHtmlNode BuildCore()
        {
            var li = new HtmlElement("li")
                    .AddClass(UIPrimitives.Editor.ToolbarButton);

            var a = new HtmlElement("a")
                    .Attribute("href", "#")
                    .AddClass(UIPrimitives.Editor.ToolIcon)
                    .AddClass(button.CssClass)
                    .Text(button.Text);

            a.AppendTo(li);
            
            return li;
        }
    }
}
