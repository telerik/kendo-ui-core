namespace Kendo.Mvc.UI
{
    public class TimezoneEditorHtmlBuilder
    {
        public TimezoneEditorHtmlBuilder(TimezoneEditor component)
        {
            this.Component = component;
        }

        public TimezoneEditor Component
        {
            get;
            private set;
        }

        public IHtmlNode Build()
        {
            var value = Component.GetValue(Component.Value);

            return new HtmlElement("div")
                .Attributes(new { name = Component.Name, id = Component.Id })
                .Attributes(Component.GetUnobtrusiveValidationAttributes())
                .Attributes(Component.HtmlAttributes)
                .ToggleClass("input-validation-error", !Component.IsValid());
        }
    }
}
