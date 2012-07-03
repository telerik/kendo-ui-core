namespace Kendo.Mvc.UI.Fluent
{
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Resources;
    using System;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="DatePicker"/> component.
    /// </summary>
    public class DatePickerBuilder: DatePickerBuilderBase<DatePicker, DatePickerBuilder>
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="DatePickerBuilder"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public DatePickerBuilder(DatePicker component)
            : base(component)
        {
        }

        public DatePickerBuilder FooterId(string id)
        {
            Component.FooterId = id;

            return this;
        }

        public DatePickerBuilder Footer(string footer)
        {
            Component.Footer = footer;

            return this;
        }

        public DatePickerBuilder Depth(CalendarView depth)
        {

            Component.Depth = depth.ToString().ToLower();

            return this;
        }

        public DatePickerBuilder Start(CalendarView start)
        {

            Component.Start = start.ToString().ToLower();

            return this;
        }

        public DatePickerBuilder MonthTemplateId(string id)
        {
            Component.MonthTemplate.ContentId = id;

            return this;
        }

        public DatePickerBuilder MonthTemplate(string content)
        {
            Component.MonthTemplate.Content = content;

            return this;
        }

        public DatePickerBuilder MonthTemplate(Action<MonthTemplateBuilder> monthTemplateAction)
        {

            monthTemplateAction(new MonthTemplateBuilder(Component.MonthTemplate));

            return this;
        }
                       
        /// <summary>
        /// Sets the minimal date, which can be selected in DatePicker.
        /// </summary>
        public DatePickerBuilder Min(string date)
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
        public DatePickerBuilder Max(string date)
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
    }
}