namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;
    using Infrastructure;
    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="TimePicker"/> component.
    /// </summary>
    public class TimePickerBuilder : DatePickerBuilderBase<TimePicker, TimePickerBuilder>, IHideObjectMembers
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
        /// Sets the minimum time, which can be selected in timepicker
        /// </summary>
        public TimePickerBuilder Min(TimeSpan value)
        {
            Component.Min = new DateTime(value.Ticks);

            return this;
        }

        /// <summary>
        /// Sets the minimum time, which can be selected in timepicker
        /// </summary>
        public TimePickerBuilder Min(string value)
        {

            Component.Min = DateTime.Parse(value);
            
            return this;
        }

        /// <summary>
        /// Sets the maximum time, which can be selected in timepicker
        /// </summary>
        public TimePickerBuilder Max(TimeSpan value)
        {
            Component.Max = new DateTime(value.Ticks);

            return this;
        }

        /// <summary>
        /// Sets the maximum time, which can be selected in timepicker
        /// </summary>
        public TimePickerBuilder Max(string value)
        {

            Component.Max = DateTime.Parse(value);
            
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
        /// Binds the TimePicker to a list of DateTime objects.
        /// </summary>
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
        public TimePickerBuilder BindTo(IList<DateTime> dates)
        {
            Component.Dates = dates;

            return this;
        }
    }
}