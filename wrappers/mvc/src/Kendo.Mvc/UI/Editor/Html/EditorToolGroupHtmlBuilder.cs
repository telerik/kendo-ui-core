namespace Kendo.Mvc.UI.Html
{
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.UI;
    
    public class EditorToolGroupHtmlBuilder : HtmlBuilderBase
    {
        private readonly EditorToolGroup group;

        public EditorToolGroupHtmlBuilder(EditorToolGroup group)
        {
            this.group = group;
        }

        protected override IHtmlNode BuildCore()
        {
            var ul = new HtmlElement("ul")
                .AddClass("t-editor-toolbar");

            group.Tools.Each(tool =>
            {
                tool.CreateHtmlBuilder()
                    .Build()
                    .AppendTo(ul);
            });

            return ul;
        }
    }
}
