namespace Kendo.Mvc.UI.Fluent
{
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Resources;
    using System;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="DatePickerBase"/> component.
    /// </summary>
    public class DatePickerBuilderBase<TPicker, TPickerBuilder> : ViewComponentBuilderBase<TPicker, TPickerBuilder>, IHideObjectMembers
        where TPicker : DatePickerBase
        where TPickerBuilder : ViewComponentBuilderBase<TPicker, TPickerBuilder>
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="DatePickerBaseBuilder"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public DatePickerBuilderBase(TPicker component)
            : base(component)
        {
        }

        public TPickerBuilder Animation(bool enable)
        {
            Component.Animation.Enabled = enable;

            return this as TPickerBuilder;
        }

        public TPickerBuilder Animation(Action<PopupAnimationBuilder> animationAction)
        {
            Guard.IsNotNull(animationAction, "animationAction");

            animationAction(new PopupAnimationBuilder(Component.Animation));

            return this as TPickerBuilder;
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
        public TPickerBuilder Events(Action<DatePickerEventBuilderBase> clientEventsAction)
        {
            Guard.IsNotNull(clientEventsAction, "clientEventsAction");

            clientEventsAction(new DatePickerEventBuilderBase(Component.Events));

            return this as TPickerBuilder;
        }

        /// <summary>
        /// Sets the date format, which will be used to parse and format the machine date.
        /// </summary>
        public TPickerBuilder Format(string format)
        {
            Guard.IsNotNullOrEmpty(format, "format");

            Component.Format = format;

            return this as TPickerBuilder;
        }

        public TPickerBuilder ParseFormats(IEnumerable<string> formats)
        {
            Component.ParseFormats.Clear();
            Component.ParseFormats.AddRange(formats);

            return this as TPickerBuilder;
        }

        /// <summary>
        /// Enables or disables the picker.
        /// </summary>
        public TPickerBuilder Enable(bool value)
        {
            Component.Enabled = value;

            return this as TPickerBuilder;
        }

        /// <summary>
        /// Sets the minimal date, which can be selected in picker.
        /// </summary>
        public TPickerBuilder Min(DateTime date)
        {
            Guard.IsNotNull(date, "date");

            Component.Min = date;

            return this as TPickerBuilder;
        }

        /// <summary>
        /// Sets the maximal date, which can be selected in picker.
        /// </summary>
        public TPickerBuilder Max(DateTime date)
        {
            Guard.IsNotNull(date, "date");

            Component.Max = date;

            return this as TPickerBuilder;
        }

        /// <summary>
        /// Sets the value of the picker input
        /// </summary>
        public TPickerBuilder Value(DateTime? date)
        {
            Component.Value = date;

            return this as TPickerBuilder;
        }

        /// <summary>
        /// Sets the value of the picker input
        /// </summary>
        public TPickerBuilder Value(string date)
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

            return this as TPickerBuilder;
        }
    }
}