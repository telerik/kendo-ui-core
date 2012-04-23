

namespace KendoUI.Mvc.UI.Fluent
{
    using System;

    using Extensions;
    using Infrastructure;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="TimePicker"/> component.
    /// </summary>
    public class DateTimePickerBuilder : DatePickerBaseBuilder<DateTimePicker, DateTimePickerBuilder>
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
        /// Sets the value of the dateTimePicker input
        /// </summary>
        public DateTimePickerBuilder Value(DateTime? date)
        {
            Component.Value = date;

            return this;
        }

        /// <summary>
        /// Sets the value of the dateTimePicker input
        /// </summary>
        public DateTimePickerBuilder Value(string date)
        {
            DateTime parsedDate;

            if (DateTime.TryParse(date, out parsedDate))
            {
                Component.Value = parsedDate;
            }
            else
            {
                Component.Value = null;
            }
            return this;
        }

        /// <summary>
        /// Sets the minimal date, which can be selected in DateTimePicker.
        /// </summary>
        public DateTimePickerBuilder Min(string value)
        {
            Guard.IsNotNullOrEmpty(value, "value");

            var date = DateTime.Parse(value);
            
            Component.MinValue = date;

            return this;
        }

        /// <summary>
        /// Sets the maximal date, which can be selected in DateTimePicker.
        /// </summary>
        public DateTimePickerBuilder Max(string value)
        {
            Guard.IsNotNullOrEmpty(value, "value");

            var date = DateTime.Parse(value);

            Component.MaxValue = date;

            return this;
        }

        /// <summary>
        /// Sets the minimal time, which can be selected in DateTimePicker.
        /// </summary>
        public DateTimePickerBuilder StartTime(DateTime date)
        {
            Guard.IsNotNull(date, "date");

            Component.StartTime = date;

            return this;
        }

        /// <summary>
        /// Sets the minimal time, which can be selected in DateTimePicker.
        /// </summary>
        public DateTimePickerBuilder StartTime(string value)
        {
            Guard.IsNotNullOrEmpty(value, "value");

            var date = DateTime.Parse(value);

            Component.StartTime = date;

            return this;
        }

        /// <summary>
        /// Sets the maximal time, which can be selected in DateTimePicker.
        /// </summary>
        public DateTimePickerBuilder EndTime(DateTime date)
        {
            Guard.IsNotNull(date, "date");

            Component.EndTime = date;

            return this;
        }

        /// <summary>
        /// Sets the maximal time, which can be selected in DateTimePicker.
        /// </summary>
        public DateTimePickerBuilder EndTime(string value)
        {
            Guard.IsNotNullOrEmpty(value, "value");

            var date = DateTime.Parse(value);

            Component.EndTime = date;

            return this;
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
        /// Sets the title of the DateTimePicker button.
        /// </summary>
        public DateTimePickerBuilder CalendarButtonTitle(string title)
        {
            Guard.IsNotNullOrEmpty(title, "title");

            Component.CalendarButtonTitle = title;

            return this;
        }

        /// <summary>
        /// Sets the title of the DateTimePicker button.
        /// </summary>
        public DateTimePickerBuilder TimeButtonTitle(string title)
        {
            Guard.IsNotNullOrEmpty(title, "title");

            Component.TimeButtonTitle = title;

            return this;
        }

        /// <summary>
        /// Binds the TimeView to a list of DateTime objects.
        /// </summary>
        /// <param name="dataSource">The data source.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().TimePicker()
        ///             .Name("TimePicker")
        ///             .BindTo(new List<DateTime>
        ///             {
        ///                 DateTime.Now
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public DateTimePickerBuilder BindTo(List<DateTime> dates)
        {
            Guard.IsNotNull(dates, "dates");

            Component.Dates = dates;

            return this;
        }
    }
}