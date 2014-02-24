namespace Kendo.Mvc.UI.Html
{
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.UI;
    using System;
    using System.Web.Mvc;
    using System.Globalization;

    public class MaskedTextBoxHtmlBuilder
    {
        public MaskedTextBoxHtmlBuilder(MaskedTextBox component)
        {
            Component = component;
        }

        public MaskedTextBox Component
        { 
            get; 
            private set; 
        }

        public IHtmlNode Build()
        {           
            return new HtmlElement("input", TagRenderMode.SelfClosing)
                   .Attributes(new { name = Component.Name, id = Component.Id })
                   .ToggleAttribute("value", Component.Value, Component.Value.HasValue())
                   .Attributes(Component.GetUnobtrusiveValidationAttributes())
                   .ToggleAttribute("disabled", "disabled", !Component.Enabled)
                   .Attributes(Component.HtmlAttributes)
                   .ToggleClass("input-validation-error", !Component.IsValid());
        }
    }
}
