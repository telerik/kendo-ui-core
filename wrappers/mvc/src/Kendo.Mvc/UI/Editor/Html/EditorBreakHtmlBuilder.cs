namespace Kendo.Mvc.UI.Html
{
    public class EditorBreakHtmlBuilder : HtmlBuilderBase
    {
        protected override IHtmlNode BuildCore()
        {
            return new HtmlElement("li")
                    .AddClass("t-break");
        }
    }
}
