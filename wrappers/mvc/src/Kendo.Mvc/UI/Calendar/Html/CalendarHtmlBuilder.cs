namespace Kendo.Mvc.UI
{
    using System;

    public class CalendarHtmlBuilder
    {
        public CalendarHtmlBuilder(Calendar calendar)
        {
            Calendar = calendar;
        }

        public Calendar Calendar
        {
            get;
            private set;
        }

        public IHtmlNode Build()
        {
            return new HtmlElement("div")
                            .Attribute("id", Calendar.Id)
                            .Attributes(Calendar.HtmlAttributes)
                            .PrependClass(UIPrimitives.Widget, "k-calendar");
        }
    }
}
