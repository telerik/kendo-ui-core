namespace Kendo.Mvc.UI
{
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.UI;
    using System.Web.Mvc;

    public class RecurrenceEditorHtmlBuilder
    {
        public RecurrenceEditorHtmlBuilder(RecurrenceEditor component)
        {
            this.Component = component;
        }

        public RecurrenceEditor Component
        {
            get;
            private set;
        }

        public IHtmlNode Build()
        {
            var value = Component.GetValue(Component.Value);

            return new HtmlElement("div")
                .Attribute("id", Component.Id)
                .Attributes(new { name = Component.Name, id = Component.Id })
                //.ToggleAttribute("value", value, value.HasValue())
                .Attributes(Component.HtmlAttributes)
                .Attributes(Component.GetUnobtrusiveValidationAttributes())
                .ToggleClass("input-validation-error", !Component.IsValid());
        }
    }
}
