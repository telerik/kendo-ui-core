namespace Kendo.Mvc.UI.Html
{
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.UI;
    using System.Web.Mvc;

    public class DropDownListHtmlBuilderBase
    {
        public DropDownListHtmlBuilderBase(DropDownListBase component)
        {
            this.Component = component;
        }

        public DropDownListBase Component
        {
            get;
            private set;
        }

        public IHtmlNode Build()
        {
            var value = Component.GetValue(Component.Value);

            return new HtmlElement("input", TagRenderMode.SelfClosing)
                   .Attributes(new { name = Component.Name, id = Component.Id, type = "text" })
                   .ToggleAttribute("value", value, value.HasValue())
                   .Attributes(Component.HtmlAttributes)
                   .Attributes(Component.GetUnobtrusiveValidationAttributes())
                   .ToggleAttribute("disabled", "disabled", Component.Enabled == false)
                   .ToggleClass("input-validation-error", !Component.IsValid());
        }
    }
}
