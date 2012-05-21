namespace Kendo.Mvc.UI.Fluent
{
    using System;

    using Extensions;
    using Infrastructure;
    using Kendo.Mvc.Resources;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="DatePicker"/> component.
    /// </summary>
    public class DatePickerBuilder: ViewComponentBuilderBase<DatePicker, DatePickerBuilder>, IHideObjectMembers
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="DatePickerBuilder"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public DatePickerBuilder(DatePicker component)
            : base(component)
        {
        }
        
        /// <summary>
        /// Sets the date format, which will be used to parse and format the machine date.
        /// </summary>
        public DatePickerBuilder Format(string format)
        {
            Component.Format = format;

            return this;
        }

        public DatePickerBuilder ParseFormats(IEnumerable<string> formats)
        {
            Component.ParseFormats.Clear();
            Component.ParseFormats.AddRange(formats);

            return this;
        }

        public DatePickerBuilder Footer(string footer)
        {
            Component.Footer = footer;

            return this;
        }

        public DatePickerBuilder Depth(string depth)
        {
            Component.Depth = depth;

            return this;
        }

        public DatePickerBuilder Start(string start)
        {
            Component.Start = start;

            return this;
        }

        public DatePickerBuilder Animation(bool enable)
        {
            Component.Animation.Enabled = enable;

            return this;
        }

        public DatePickerBuilder Animation(Action<PopupAnimationBuilder> animationAction)
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
        public DatePickerBuilder ClientEvents(Action<DatePickerClientEventsBuilder> clientEventsAction)
        {
            Guard.IsNotNull(clientEventsAction, "clientEventsAction");

            clientEventsAction(new DatePickerClientEventsBuilder(Component.ClientEvents));

            return this;
        }

        public DatePickerBuilder MonthTemplate(string content)
        {
            Component.MonthTemplate.content = content;

            return this;
        }

        public DatePickerBuilder MonthTemplate(Action<MonthTemplateBuilder> monthTemplateAction)
        {
            Guard.IsNotNull(monthTemplateAction, "clientEventsAction");

            monthTemplateAction(new MonthTemplateBuilder(Component.MonthTemplate));

            return this;
        }

        /// <summary>
        /// Enables or disables the datepicker.
        /// </summary>
        public DatePickerBuilder Enable(bool value)
        {
            Component.Enabled = value;

            return this;
        }
        
        /// <summary>
        /// Sets the value of the datepicker input
        /// </summary>
        public DatePickerBuilder Value(DateTime? date)
        {
            if (date.HasValue)
            {
                date = date.Value == DateTime.MinValue ? null : date;
            }

            Component.Value = date;

            return this;
        }

        /// <summary>
        /// Sets the value of the datepicker input
        /// </summary>
        public DatePickerBuilder Value(string date)
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
        /// Sets the minimal date, which can be selected in DatePicker.
        /// </summary>
        public DatePickerBuilder Min(DateTime date)
        {
            Guard.IsNotNull(date, "date");

            Component.Min = date;

            return this;
        }

        /// <summary>
        /// Sets the maximal date, which can be selected in DatePicker.
        /// </summary>
        public DatePickerBuilder Max(DateTime date)
        {
            Guard.IsNotNull(date, "date");

            Component.Max = date;

            return this;
        }

        /// <summary>
        /// Sets the minimal date, which can be selected in DatePicker.
        /// </summary>
        public DatePickerBuilder Min(string date)
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
        public DatePickerBuilder Max(string date)
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