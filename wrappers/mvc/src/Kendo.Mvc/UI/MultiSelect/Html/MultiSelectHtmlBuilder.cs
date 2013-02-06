namespace Kendo.Mvc.UI.Html
{
    using Kendo.Mvc.UI;
    using System.Web.Mvc;

    public class MultiSelectHtmlBuilder
    {
        public MultiSelectHtmlBuilder(MultiSelect component)
        {
            this.Component = component;
        }

        public MultiSelect Component
        {
            get;
            private set;
        }

        public IHtmlNode Build()
        {
            return new HtmlElement("select", TagRenderMode.Normal)
                   .Attributes(new { name = Component.Name, id = Component.Id, multiple="multiple" })
                   .Attributes(Component.HtmlAttributes)
                   .Attributes(Component.GetUnobtrusiveValidationAttributes())
                   .ToggleAttribute("disabled", "disabled", Component.Enabled == false)
                   .ToggleClass("input-validation-error", !Component.IsValid());
        }
    }
}
