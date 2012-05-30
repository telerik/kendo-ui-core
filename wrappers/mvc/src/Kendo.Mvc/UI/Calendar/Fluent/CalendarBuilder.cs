namespace Kendo.Mvc.UI
{
    using System;

    using Infrastructure;
    using Resources;
    using Kendo.Mvc.UI.Fluent;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="Calendar"/>.
    /// </summary>
    public class CalendarBuilder : ViewComponentBuilderBase<Calendar, CalendarBuilder>, IHideObjectMembers
    {

        /// <summary>
        /// Initializes a new instance of the <see cref="Calendar"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public CalendarBuilder(Calendar component)
            : base(component)
        {
        }

        /// <summary>
        /// Configures the client-side events.
        /// </summary>
        /// <param name="clientEventsAction">The client events action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Calendar()
        ///             .Name("Calendar")
        ///             .Events(events =>
        ///                 events.Select("onSelect")
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public CalendarBuilder Events(Action<CalendarEventBuilder> clientEventsAction)
        {
            clientEventsAction(new CalendarEventBuilder(Component.Events));

            return this;
        }

        /// <summary>
        /// Sets the date format, which will be used to parse and format the machine date.
        /// </summary>
        public CalendarBuilder Format(string format)
        {
            Component.Format = format;

            return this;
        }
        
        public CalendarBuilder Footer(string footer)
        {
            Component.Footer = footer;

            return this;
        }

        public CalendarBuilder Depth(CalendarView depth)
        {
            Component.Depth = depth.ToString().ToLower();

            return this;
        }

        public CalendarBuilder Start(CalendarView start)
        {
            Component.Start = start.ToString().ToLower();

            return this;
        }

        public CalendarBuilder MonthTemplate(string content)
        {
            Component.MonthTemplate.Content = content;

            return this;
        }

        public CalendarBuilder MonthTemplate(Action<MonthTemplateBuilder> monthTemplateAction)
        {
            Guard.IsNotNull(monthTemplateAction, "clientEventsAction");

            monthTemplateAction(new MonthTemplateBuilder(Component.MonthTemplate));

            return this;
        }
                       
        /// <summary>
        /// Sets the minimal date, which can be selected in the calendar.
        /// </summary>
        public CalendarBuilder Min(string date)
        {
            DateTime parsedDate;

            if (DateTime.TryParse(date, out parsedDate))
            {
                Component.Min = parsedDate;
            }
            else
            {
                throw new ArgumentException(TextResource.StringNotCorrectDate);
            }
            return this;
        }

        /// <summary>
        /// Sets the maximal date, which can be selected in the calendar.
        /// </summary>
        public CalendarBuilder Max(string date)
        {
            DateTime parsedDate;

            if (DateTime.TryParse(date, out parsedDate))
            {
                Component.Max = parsedDate;
            }
            else
            {
                throw new ArgumentException(TextResource.StringNotCorrectDate);
            }
            return this;
        }

        /// <summary>
        /// Sets the minimal date, which can be selected in the calendar
        /// </summary>
        public CalendarBuilder Min(DateTime date)
        {
            Component.Min = date;

            return this;
        }

        /// <summary>
        /// Sets the maximal date, which can be selected in the calendar
        /// </summary>
        public CalendarBuilder Max(DateTime date)
        {
            Component.Max = date;

            return this;
        }

        /// <summary>
        /// Sets the value of the calendar
        /// </summary>
        public CalendarBuilder Value(DateTime? date)
        {
            Component.Value = date;

            return this;
        }

        /// <summary>
        /// Sets the value of the calendar
        /// </summary>
        public CalendarBuilder Value(string date)
        {
            DateTime result;

            if (DateTime.TryParse(date, out result))
            {
                Component.Value = result;
            }
            else
            {
                Component.Value = null;
            }

            return this;
        }
    }
}
