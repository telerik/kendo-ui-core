namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;
    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="DatePickerBase"/> component.
    /// </summary>
    public class DatePickerBuilderBase<TPicker, TPickerBuilder> : WidgetBuilderBase<TPicker, TPickerBuilder>, IHideObjectMembers
        where TPicker : DatePickerBase
        where TPickerBuilder : WidgetBuilderBase<TPicker, TPickerBuilder>
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="DatePickerBuilderBase{TPicker, TPickerBuilder}"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public DatePickerBuilderBase(TPicker component)
            : base(component)
        {
        }

        /// <summary>
        /// Use to enable or disable animation of the popup element.
        /// </summary>
        /// <param name="enable">The boolean value.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().DatePicker()
        ///	           .Name("DatePicker")
        ///	           .Animation(false) //toggle effect
        ///	%&gt;
        /// </code>
        /// </example>
        public TPickerBuilder Animation(bool enable)
        {
            Component.Animation.Enabled = enable;

            return this as TPickerBuilder;
        }

        /// <summary>
        /// Configures the animation effects of the widget.
        /// </summary>
        /// <param name="animationAction">The action which configures the animation effects.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().DatePicker()
        ///	           .Name("DatePicker")
        ///	           .Animation(animation =>
        ///	           {
        ///		            animation.Open(open =>
        ///		            {
        ///		                open.SlideIn(SlideDirection.Down);
        ///		            }
        ///	           })
        ///	%&gt;
        /// </code>
        /// </example>
        public TPickerBuilder Animation(Action<PopupAnimationBuilder> animationAction)
        {

            animationAction(new PopupAnimationBuilder(Component.Animation));

            return this as TPickerBuilder;
        }

        /// <summary>
        /// Specifies the culture info used by the widget.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().DatePicker()
        ///             .Name("DatePicker")
        ///             .Culture("de-DE")
        /// %&gt;
        /// </code>
        /// </example>
        public TPickerBuilder Culture(string culture)
        {
            Component.Culture = culture;

            return this as TPickerBuilder;
        }

        /// <summary>
        /// Configures the client-side events.
        /// </summary>
        /// <param name="clientEventsAction">The client events action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().DatePicker()
        ///             .Name("DatePicker")
        ///             .Events(events =>
        ///                 events.Open("open").Change("change")
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public TPickerBuilder Events(Action<DatePickerEventBuilderBase> clientEventsAction)
        {

            clientEventsAction(new DatePickerEventBuilderBase(Component.Events));

            return this as TPickerBuilder;
        }

        /// <summary>
        /// Sets the date format, which will be used to parse and format the machine date.
        /// </summary>
        public TPickerBuilder Format(string format)
        {

            Component.Format = format;

            return this as TPickerBuilder;
        }

        /// <summary>
        /// Specifies the formats, which are used to parse the value set with value() method or by direct input.
        /// </summary>
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

            Component.Min = date;

            return this as TPickerBuilder;
        }

        /// <summary>
        /// Sets the maximal date, which can be selected in picker.
        /// </summary>
        public TPickerBuilder Max(DateTime date)
        {

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