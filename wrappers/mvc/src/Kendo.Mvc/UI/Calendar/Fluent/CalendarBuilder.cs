namespace Kendo.Mvc.UI.Fluent
{
    using Kendo.Mvc.Resources;
    using System;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="Calendar"/>.
    /// </summary>
    public class CalendarBuilder : WidgetBuilderBase<Calendar, CalendarBuilder>, IHideObjectMembers
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
        /// Specifies the culture info used by the NumericTextBox widget.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Calendar()
        ///             .Name("calendar")
        ///             .Culture("de-DE")
        /// %&gt;
        /// </code>
        /// </example>
        public CalendarBuilder Culture(string culture)
        {
            Component.Culture = culture;

            return this;
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

        /// <summary>
        /// FooterId to be used for rendering the footer of the Calendar.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Calendar()
        ///             .Name("Calendar")
        ///             .FooterId("widgetFooterId")
        /// %&gt;
        /// </code>
        /// </example>
        public CalendarBuilder FooterId(string id)
        {
            Component.FooterId = id;

            return this;
        }

        /// <summary>
        /// Footer template to be used for rendering the footer of the Calendar.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Calendar()
        ///             .Name("Calendar")
        ///             .Footer("#= kendo.toString(data, "G") #")
        /// %&gt;
        /// </code>
        /// </example>
        public CalendarBuilder Footer(string footer)
        {
            Component.Footer = footer;

            return this;
        }

        /// <summary>
        /// Specifies the navigation depth.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Calendar()
        ///             .Name("Calendar")
        ///             .Depth(CalendarView.Month)
        /// %&gt;
        /// </code>
        /// </example>
        public CalendarBuilder Depth(CalendarView depth)
        {
            Component.Depth = depth.ToString().ToLower();

            return this;
        }

        /// <summary>
        /// Specifies the start view.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Calendar()
        ///             .Name("Calendar")
        ///             .Start(CalendarView.Month)
        /// %&gt;
        /// </code>
        /// </example>
        public CalendarBuilder Start(CalendarView start)
        {
            Component.Start = start.ToString().ToLower();

            return this;
        }

        /// <summary>
        /// MonthTemplateId to be used for rendering the cells of the Calendar.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Calendar()
        ///             .Name("Calendar")
        ///             .MonthTemplateId("widgetMonthTemplateId")
        /// %&gt;
        /// </code>
        /// </example>
        public CalendarBuilder MonthTemplateId(string id)
        {
            Component.MonthTemplate.ContentId = id;

            return this;
        }

        /// <summary>
        /// Templates for the cells rendered in the "month" view.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Calendar()
        ///             .Name("Calendar")
        ///             .MonthTemplate("#= data.value #")
        /// %&gt;
        /// </code>
        /// </example>
        public CalendarBuilder MonthTemplate(string content)
        {
            Component.MonthTemplate.Content = content;

            return this;
        }

        /// <summary>
        /// Configures the content of cells of the Calendar.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Calendar()
        ///             .Name("Calendar")
        ///             .MonthTemplate(month => month.Content("#= data.value #"))
        /// %&gt;
        /// </code>
        /// </example>
        public CalendarBuilder MonthTemplate(Action<MonthTemplateBuilder> monthTemplateAction)
        {

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
                throw new ArgumentException(Exceptions.StringNotCorrectDate);
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
                throw new ArgumentException(Exceptions.StringNotCorrectDate);
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

        /// <summary>
        /// Configures the selection settings of the calendar.
        /// </summary>
        /// <param name="selectionAction">SelectAction settings, which includes Action name and IEnumerable of DateTime objects.</param>
        /// <returns></returns>
        public CalendarBuilder Selection(Action<CalendarSelectionSettingsBuilder> selectionAction)
        {
            selectionAction(new CalendarSelectionSettingsBuilder(Component.SelectionSettings));

            return this;
        }
    }
}
