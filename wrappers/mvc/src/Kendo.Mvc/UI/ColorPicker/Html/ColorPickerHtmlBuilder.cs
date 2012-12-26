namespace Kendo.Mvc.UI.Html
{
    using System.Web.Mvc;

    public class ColorPickerHtmlBuilder
    {
        public ColorPicker Component;

        public ColorPickerHtmlBuilder(ColorPicker Component)
        {
            this.Component = Component;
        }

        public IHtmlNode Build()
        {
            return new HtmlElement("input", TagRenderMode.SelfClosing)
                   .Attributes(new { name = Component.Name, id = Component.Id, type = "color" })
                   .Attributes(Component.HtmlAttributes)
                   .Attributes(Component.GetUnobtrusiveValidationAttributes())
                   .ToggleAttribute("value", Component.Value, !string.IsNullOrEmpty(Component.Value))
                   .ToggleAttribute("disabled", "disabled", !Component.Enabled)
                   .ToggleClass("input-validation-error", !Component.IsValid())
                   .PrependClass(UIPrimitives.Input);
        }
    }
}