namespace Kendo.Mvc.UI.Fluent
{
    using System;

    using Extensions;
    using Infrastructure;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="TimePicker"/> component.
    /// </summary>
    public class TimePickerBuilder : ViewComponentBuilderBase<TimePicker, TimePickerBuilder>, IHideObjectMembers
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="TimePickerBuilder"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public TimePickerBuilder(TimePicker component)
            : base(component)
        {
        }

        public TimePickerBuilder Animation(bool enable)
        {
            Component.Animation.Enabled = enable;

            return this;
        }

        public TimePickerBuilder Animation(Action<PopupAnimationBuilder> animationAction)
        {
            Guard.IsNotNull(animationAction, "animationAction");

            animationAction(new PopupAnimationBuilder(Component.Animation));

            return this;
        }

        /// <summary>
        /// Sets the date format, which will be used to parse and format the machine date.
        /// </summary>
        public TimePickerBuilder Format(string format)
        {
            Component.Format = format;

            return this;
        }

        public TimePickerBuilder ParseFormats(IEnumerable<string> formats)
        {
            Component.ParseFormats.Clear();
            Component.ParseFormats.AddRange(formats);

            return this;
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
            Component.Min = new DateTime(value.Ticks);

            return this;
        }

        /// <summary>
        /// Sets the minimum time, which can be selected in timepicker
        /// </summary>
        public TimePickerBuilder Min(string value)
        {
            Guard.IsNotNullOrEmpty(value, "value");

            var time = TimeSpan.Parse(value);
            
            Component.Min = new DateTime(time.Ticks);
            
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
            Guard.IsNotNullOrEmpty(value, "value");

            TimeSpan time = TimeSpan.Parse(value);
            
            Component.Max = new DateTime(time.Ticks);
            
            return this;
        }
        
        /// <summary>
        /// Sets the minimal date, which can be selected in DatePicker.
        /// </summary>
        public TimePickerBuilder Min(DateTime date)
        {
            Guard.IsNotNull(date, "date");

            Component.Min = date;

            return this;
        }

        /// <summary>
        /// Sets the maximal date, which can be selected in DatePicker.
        /// </summary>
        public TimePickerBuilder Max(DateTime date)
        {
            Guard.IsNotNull(date, "date");

            Component.Max = date;

            return this;
        }

        /// <summary>
        /// Configures the client-side events.
        /// </summary>
        /// <param name="clientEventsAction">The client events action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().DatePicker()
        ///             .Name("DatePicker")
        ///             .ClientEvents(events =>
        ///                 events.OnLoad("onLoad").OnSelect("onSelect")
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public TimePickerBuilder ClientEvents(Action<DatePickerBaseClientEventsBuilder> clientEventsAction)
        {
            Guard.IsNotNull(clientEventsAction, "clientEventsAction");

            clientEventsAction(new DatePickerBaseClientEventsBuilder(Component.ClientEvents));

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

        public TimePickerBuilder Enable(bool value)
        {
            Component.Enabled = value;

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