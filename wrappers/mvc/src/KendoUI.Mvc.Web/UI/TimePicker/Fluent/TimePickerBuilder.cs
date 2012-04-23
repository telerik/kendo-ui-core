

namespace KendoUI.Mvc.UI.Fluent
{
    using System;

    using Extensions;
    using Infrastructure;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="TimePicker"/> component.
    /// </summary>
    public class TimePickerBuilder : DatePickerBaseBuilder<TimePicker, TimePickerBuilder>
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="TimePickerBuilder"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public TimePickerBuilder(TimePicker component)
            : base(component)
        {
        }
        
        /// <summary>
        /// Sets the value of the timepicker input
        /// </summary>
        public TimePickerBuilder Value(DateTime? time)
        {
            Component.Value = time;

            return this;
        }

        /// <summary>
        /// Sets the value of the timepicker input
        /// </summary>
        public TimePickerBuilder Value(TimeSpan? time)
        {
            if (time.HasValue)
            {
                Component.Value = new DateTime(time.Value.Ticks);
            }
            else
            {
                Component.Value = null;
            }

            return this;
        }

        /// <summary>
        /// Sets the value of the timepicker input
        /// </summary>
        public TimePickerBuilder Value(string time)
        {
            DateTime result;

            if (DateTime.TryParse(time, out result))
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
        /// Sets the minimum time, which can be selected in timepicker
        /// </summary>
        public TimePickerBuilder Min(TimeSpan value)
        {
            Component.MinValue = new DateTime(value.Ticks);

            return this;
        }

        /// <summary>
        /// Sets the minimum time, which can be selected in timepicker
        /// </summary>
        public TimePickerBuilder Min(string value)
        {
            Guard.IsNotNullOrEmpty(value, "value");

            var time = TimeSpan.Parse(value);
            
            Component.MinValue = new DateTime(time.Ticks);
            
            return this;
        }

        /// <summary>
        /// Sets the maximum time, which can be selected in timepicker
        /// </summary>
        public TimePickerBuilder Max(TimeSpan value)
        {
            Component.MaxValue = new DateTime(value.Ticks);

            return this;
        }

        /// <summary>
        /// Sets the maximum time, which can be selected in timepicker
        /// </summary>
        public TimePickerBuilder Max(string value)
        {
            Guard.IsNotNullOrEmpty(value, "value");

            TimeSpan time = TimeSpan.Parse(value);
            
            Component.MaxValue = new DateTime(time.Ticks);
            
            return this;
        }
        
        /// <summary>
        /// Sets the interval between hours.
        /// </summary>
        public TimePickerBuilder Interval(int interval) 
        {
            Component.Interval = interval;

            return this;
        }

        /// <summary>
        /// Sets whether timepicker to be rendered with button, which shows timeview on click.
        /// </summary>
        public TimePickerBuilder ShowButton(bool showButton)
        {
            Component.ShowButton = showButton;

            return this;
        }

        /// <summary>
        /// Sets the title of the timepicker button.
        /// </summary>
        public TimePickerBuilder ButtonTitle(string title)
        {
            Guard.IsNotNullOrEmpty(title, "title");

            Component.ButtonTitle = title;

            return this;
        }

        /// <summary>
        /// Binds the TimePicker to a list of DateTime objects.
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
        public TimePickerBuilder BindTo(List<DateTime> dates)
        {
            Guard.IsNotNull(dates, "dates");

            Component.Dates = dates;

            return this;
        }
    }
}