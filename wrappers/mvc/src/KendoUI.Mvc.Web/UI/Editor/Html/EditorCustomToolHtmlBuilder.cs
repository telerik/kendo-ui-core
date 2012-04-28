using KendoUI.Mvc.Infrastructure;

namespace KendoUI.Mvc.UI.Html
{
    public class EditorCustomToolHtmlBuilder : HtmlBuilderBase
    {
        private readonly EditorCustomTool tool;

        public EditorCustomToolHtmlBuilder(EditorCustomTool tool)
        {
            this.tool = tool;
        }
        
        protected override IHtmlNode BuildCore()
        {
            var li = new HtmlElement("li");

            if (tool.Template.HasValue())
            {
                li.AddClass(UIPrimitives.Editor.Custom);

                tool.Template.Apply(li);
            }
            else
            {
                li.AddClass(UIPrimitives.Editor.ToolbarButton);
                var a = new HtmlElement("a")
                        .Attributes(tool.HtmlAttributes)
                        .Attribute("href", "#")
                        .AddClass(UIPrimitives.Editor.ToolIcon);

                a.AppendTo(li);
            }

            return li;
        }
    }
}
