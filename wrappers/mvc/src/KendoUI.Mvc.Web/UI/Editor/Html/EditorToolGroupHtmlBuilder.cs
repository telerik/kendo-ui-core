

namespace KendoUI.Mvc.UI.Html
{
    using KendoUI.Mvc.Extensions;
    using KendoUI.Mvc.Infrastructure;
    using KendoUI.Mvc.UI;
    
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
