namespace Kendo.Mvc.UI.Html
{
    using System.Linq;
    using Kendo.Mvc.UI;

    public class EditorHtmlBuilder : HtmlBuilderBase
    {
        private readonly Editor editor;

        public EditorHtmlBuilder(Editor component)
        {
            this.editor = component;
        }

        protected override IHtmlNode BuildCore()
        {
            return CreateTextArea();
        }

        public IHtmlNode CreateTextArea()
        {
            var content = new HtmlElement("textarea")
                            .Attributes(new
                            {
                                cols = "20",
                                rows = "5",
                                name = editor.Name,
                                id = editor.Id
                            })
                            .Attributes(editor.HtmlAttributes)
                            .Attributes(editor.GetUnobtrusiveValidationAttributes());

            var value = editor.GetValue<string>(editor.Value);

            if (!string.IsNullOrEmpty(value))
            {
                content.Text(value);
            }
            else if (editor.Content != null)
            {
                editor.Template.Apply(content);
            }
            else if (editor.Template.InlineTemplate != null)
            {
                content.Text(editor.Template.InlineTemplate(null).ToString());
            }

            return content;
        }
    }
}
