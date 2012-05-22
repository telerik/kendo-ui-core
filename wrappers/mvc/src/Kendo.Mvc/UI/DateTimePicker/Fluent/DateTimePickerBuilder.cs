namespace Kendo.Mvc.UI.Fluent
{
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Resources;
    using System;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="TimePicker"/> component.
    /// </summary>
    public class DateTimePickerBuilder : ViewComponentBuilderBase<DateTimePicker, DateTimePickerBuilder>, IHideObjectMembers
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
        /// Sets the value of the datetimepicker input
        /// </summary>
        public DateTimePickerBuilder Value(DateTime? date)
        {
            if (date.HasValue)
            {
                date = date.Value == DateTime.MinValue ? null : date;
            }

            Component.Value = date;

            return this;
        }

        /// <summary>
        /// Sets the value of the datetimepicker input
        /// </summary>
        public DateTimePickerBuilder Value(string date)
        {
            DateTime parsedDate;

            if (DateTime.TryParse(date, out parsedDate))
            {
                Component.Value = parsedDate == DateTime.MinValue ? null : new Nullable<DateTime>(parsedDate);
            }
            else
            {
                Component.Value = null;
            }

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

        /// <summary>
        /// Sets the date format, which will be used to parse and format the machine date.
        /// </summary>
        public DateTimePickerBuilder Format(string format)
        {
            Component.Format = format;

            return this;
        }

        public DateTimePickerBuilder ParseFormats(IEnumerable<string> formats)
        {
            Component.ParseFormats.Clear();
            Component.ParseFormats.AddRange(formats);

            return this;
        }

        public DateTimePickerBuilder Footer(string footer)
        {
            Component.Footer = footer;

            return this;
        }

        public DateTimePickerBuilder Depth(string depth)
        {
            Component.Depth = depth;

            return this;
        }

        public DateTimePickerBuilder Start(string start)
        {
            Component.Start = start;

            return this;
        }

        public DateTimePickerBuilder Animation(bool enable)
        {
            Component.Animation.Enabled = enable;

            return this;
        }

        public DateTimePickerBuilder Animation(Action<PopupAnimationBuilder> animationAction)
        {
            Guard.IsNotNull(animationAction, "animationAction");

            animationAction(new PopupAnimationBuilder(Component.Animation));

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
        public DateTimePickerBuilder ClientEvents(Action<DateTimePickerClientEventsBuilder> clientEventsAction)
        {
            Guard.IsNotNull(clientEventsAction, "clientEventsAction");

            clientEventsAction(new DateTimePickerClientEventsBuilder(Component.ClientEvents));

            return this;
        }

        public DateTimePickerBuilder MonthTemplate(string content)
        {
            Component.MonthTemplate.content = content;

            return this;
        }

        public DateTimePickerBuilder MonthTemplate(Action<MonthTemplateBuilder> monthTemplateAction)
        {
            Guard.IsNotNull(monthTemplateAction, "clientEventsAction");

            monthTemplateAction(new MonthTemplateBuilder(Component.MonthTemplate));

            return this;
        }

        /// <summary>
        /// Enables or disables the datepicker.
        /// </summary>
        public DateTimePickerBuilder Enable(bool value)
        {
            Component.Enabled = value;

            return this;
        }

        /// <summary>
        /// Sets the minimal date, which can be selected in DatePicker.
        /// </summary>
        public DateTimePickerBuilder Min(DateTime date)
        {
            Guard.IsNotNull(date, "date");

            Component.Min = date;

            return this;
        }

        /// <summary>
        /// Sets the maximal date, which can be selected in DatePicker.
        /// </summary>
        public DateTimePickerBuilder Max(DateTime date)
        {
            Guard.IsNotNull(date, "date");

            Component.Max = date;

            return this;
        }

        /// <summary>
        /// Sets the minimal date, which can be selected in DatePicker.
        /// </summary>
        public DateTimePickerBuilder Min(string date)
        {
            Guard.IsNotNullOrEmpty(date, "date");

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
        /// Sets the maximal date, which can be selected in DatePicker.
        /// </summary>
        public DateTimePickerBuilder Max(string date)
        {
            Guard.IsNotNullOrEmpty(date, "date");

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
    }
}