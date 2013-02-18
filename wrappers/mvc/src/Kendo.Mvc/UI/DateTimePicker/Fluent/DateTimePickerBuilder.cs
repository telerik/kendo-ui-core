namespace Kendo.Mvc.UI.Fluent
{
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Resources;
    using System;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="TimePicker"/> component.
    /// </summary>
    public class DateTimePickerBuilder : DatePickerBuilderBase<DateTimePicker, DateTimePickerBuilder>
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="TimePickerBuilder"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public DateTimePickerBuilder(DateTimePicker component)
            : base(component)
        {
        }

        /// <summary>
        /// Sets the interval between hours.
        /// </summary>
        public DateTimePickerBuilder Interval(int interval) 
        {

            Component.Interval = interval;

            return this;
        }

        /// <summary>
        /// Binds the TimeView to a list of DateTime objects.
        /// </summary>
        /// <param name="dates">The dates.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().TimePicker()
        ///             .Name("TimePicker")
        ///             .BindTo(new List<DateTime>
        ///             {
        ///                 DateTime.Now
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public DateTimePickerBuilder BindTo(IList<DateTime> dates)
        {

            Component.Dates = dates;

            return this;
        }

        /// <summary>
        /// Footer template to be used for rendering the footer of the Calendar.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().DateTimePicker()
        ///             .Name("DateTimePicker")
        ///             .Footer("#= kendo.toString(data, "G") #")
        /// %&gt;
        /// </code>
        /// </example>
        public DateTimePickerBuilder Footer(string footer)
        {
            Component.Footer = footer;

            return this;
        }

        /// <summary>
        /// FooterId to be used for rendering the footer of the Calendar.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().DateTimePicker()
        ///             .Name("DateTimePicker")
        ///             .FooterId("widgetFooterId")
        /// %&gt;
        /// </code>
        /// </example>
        public DateTimePickerBuilder FooterId(string id)
        {
            Component.FooterId = id;

            return this;
        }

        /// <summary>
        /// Specifies the navigation depth.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().DateTimePicker()
        ///             .Name("DateTimePicker")
        ///             .Depth(CalendarView.Month)
        /// %&gt;
        /// </code>
        /// </example>
        public DateTimePickerBuilder Depth(CalendarView depth)
        {

            Component.Depth = depth.ToString().ToLower();

            return this;
        }

        /// <summary>
        /// Specifies the start view.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().DateTimePicker()
        ///             .Name("DateTimePicker")
        ///             .Start(CalendarView.Month)
        /// %&gt;
        /// </code>
        /// </example>
        public DateTimePickerBuilder Start(CalendarView start)
        {

            Component.Start = start.ToString().ToLower();

            return this;
        }

        /// <summary>
        /// MonthTemplateId to be used for rendering the cells of the Calendar.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().DateTimePicker()
        ///             .Name("DateTimePicker")
        ///             .MonthTemplateId("widgetMonthTemplateId")
        /// %&gt;
        /// </code>
        /// </example>
        public DateTimePickerBuilder MonthTemplateId(string id)
        {
            Component.MonthTemplate.ContentId = id;

            return this;
        }

        /// <summary>
        /// Templates for the cells rendered in the "month" view.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().DateTimePicker()
        ///             .Name("DateTimePicker")
        ///             .MonthTemplate("#= data.value #")
        /// %&gt;
        /// </code>
        /// </example>
        public DateTimePickerBuilder MonthTemplate(string content)
        {
            Component.MonthTemplate.Content = content;

            return this;
        }

        /// <summary>
        /// Configures the content of cells of the Calendar.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().DateTimePicker()
        ///             .Name("DateTimePicker")
        ///             .MonthTemplate(month => month.Content("#= data.value #"))
        /// %&gt;
        /// </code>
        /// </example>
        public DateTimePickerBuilder MonthTemplate(Action<MonthTemplateBuilder> monthTemplateAction)
        {
            monthTemplateAction(new MonthTemplateBuilder(Component.MonthTemplate));

            return this;
        }

        /// <summary>
        /// Sets the minimal date, which can be selected in DatePicker.
        /// </summary>
        public DateTimePickerBuilder Min(string date)
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
        /// Sets the maximal date, which can be selected in DatePicker.
        /// </summary>
        public DateTimePickerBuilder Max(string date)
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
        /// Specifies the format, which is used to format the values in the time drop-down list.
        /// </summary>
        public DateTimePickerBuilder TimeFormat(string timeFormat)
        {

            Component.TimeFormat = timeFormat;

            return this;
        }
    }
}