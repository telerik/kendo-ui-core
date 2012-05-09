namespace Kendo.Mvc.UI.Html
{
    using Kendo.Mvc.Infrastructure;
    
    public class EditorBreakHtmlBuilder : HtmlBuilderBase
    {
        private readonly EditorBreak breakSeparator;

        public EditorBreakHtmlBuilder(EditorBreak breakSeparator)
        {
            this.breakSeparator = breakSeparator;
        }

        protected override IHtmlNode BuildCore()
        {
            return new HtmlElement("li")
                    .AddClass("t-break");
        }
    }
}
