namespace Kendo.Mvc.UI
{
    using Kendo.Mvc.Extensions;
    using System.Web.Mvc;

    public class TextBoxHtmlBuilder<T>
    {
        public TextBoxHtmlBuilder(TextBox<T> textBox)
        {
            Component = textBox;
        }

        public TextBox<T> Component
        {
            get;
            private set;
        }

        public IHtmlNode Build()
        {
            string value = "";
            ModelState state;

            if (Component.ViewData.ModelState.TryGetValue(Component.Name, out state) && state.Value != null)
            {
                Component.Value = default(T);
                value = state.Value.ConvertTo(typeof(string), null) as string;
            }
            else
            {
                value = Component.GetValue(Component.Name, Component.Value, Component.Format ?? "{0}");
            }

            return new HtmlElement("input", TagRenderMode.SelfClosing)
                        .Attributes(new { name = Component.Name, id = Component.Id })
                        .ToggleAttribute("value", value , value.HasValue() )
                        .Attributes(Component.GetUnobtrusiveValidationAttributes())
                        .ToggleAttribute("disabled", "disabled", !Component.Enabled)
                        .Attributes(Component.HtmlAttributes)
                        .ToggleClass("input-validation-error", !Component.IsValid())
                        .PrependClass("k-textbox");
        }
    }
}