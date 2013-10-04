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
            var element = new HtmlElement(editor.TagName).Attributes(new { name = editor.Name, id = editor.Id });
            var inline = editor.TagName != "textarea";

            if (inline)
            {
                element.Attribute("contentEditable", "true");
            }
            else
            {
                element.Attributes(new
                {
                    cols = "20",
                    rows = "5"
                });
            }

            element.Attributes(editor.HtmlAttributes)
                   .Attributes(editor.GetUnobtrusiveValidationAttributes());

            var value = editor.GetValue<string>(editor.Value);

            if (!string.IsNullOrEmpty(value))
            {
                if (inline)
                {
                    element.Html(value);
                }
                else
                {
                    element.Text(value);
                }
            }
            else if (editor.Content != null)
            {
                editor.Template.Apply(element);
            }
            else if (editor.Template.InlineTemplate != null)
            {
                var html = editor.Template.InlineTemplate(null).ToString();

                if (inline)
                {
                    element.Html(html);
                }
                else
                {
                    element.Text(html);
                }
            }

            return element;
        }
    }
}
