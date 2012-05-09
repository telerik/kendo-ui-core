namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.Infrastructure;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="DatePickerBase"/> component.
    /// </summary>
    public class DatePickerBaseBuilder<TPicker, TPickerBuilder> : ViewComponentBuilderBase<TPicker, TPickerBuilder>, IHideObjectMembers
        where TPicker : ViewComponentBase, IDatePicker
        where TPickerBuilder : ViewComponentBuilderBase<TPicker, TPickerBuilder>
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="DatePickerBaseBuilder"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public DatePickerBaseBuilder(TPicker component)
            : base(component)
        {
        }

        /// <summary>
        /// Configures the effects of the datepicker.
        /// </summary>
        /// <param name="effectsAction">The action which configures the effects.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Telerik().DatePicker()
        ///	           .Name("DatePicker")
        ///	           .Effects(fx =>
        ///	           {
        ///		            fx.Height()
        ///			          .Opacity()
        ///					  .OpenDuration(AnimationDuration.Normal)
        ///					  .CloseDuration(AnimationDuration.Normal);
        ///	           })
        /// </code>
        /// </example>
        public TPickerBuilder Effects(Action<EffectsBuilder> addEffects)
        {
            Guard.IsNotNull(addEffects, "addAction");

            EffectsBuilderFactory factory = new EffectsBuilderFactory();

            addEffects(factory.Create(Component.Effects));

            return this as TPickerBuilder;
        }
        
        /// <summary>
        /// Sets whether calendar should open on focus.
        /// </summary>
        public TPickerBuilder OpenOnFocus(bool value)
        {
            Component.OpenOnFocus = value;

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

        /// <summary>
        /// Enables the today button of the calendar. Today should be between min/max range to be shown.
        /// </summary>
        public TPickerBuilder TodayButton()
        {
            Component.TodayFormat = "D";

            return this as TPickerBuilder;
        }

        /// <summary>
        /// Sets the format and enables the today button of the calendar. Today should be between min/max range to be shown.
        /// </summary>
        public TPickerBuilder TodayButton(string format)
        {
            Component.TodayFormat = format;

            return this as TPickerBuilder;
        }

        /// <summary>
        /// Sets the minimal date, which can be selected in DatePicker.
        /// </summary>
        public TPickerBuilder Min(DateTime date)
        {
            Guard.IsNotNull(date, "date");

            Component.MinValue = date;

            return this as TPickerBuilder;
        } 
                
          /// <summary>
        /// Sets the maximal date, which can be selected in DatePicker.
        /// </summary>
        public TPickerBuilder Max(DateTime date)
        {
            Guard.IsNotNull(date, "date");

            Component.MaxValue = date;

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
        public TPickerBuilder ClientEvents(Action<DatePickerClientEventsBuilder> clientEventsAction)
        {
            Guard.IsNotNull(clientEventsAction, "clientEventsAction");

            clientEventsAction(new DatePickerClientEventsBuilder(Component.ClientEvents));

            return this as TPickerBuilder;
        }

        /// <summary>
        /// Sets the Input HTML attributes.
        /// </summary>
        /// <param name="attributes">The HTML attributes.</param>
        public TPickerBuilder InputHtmlAttributes(object attributes)
        {
            return InputHtmlAttributes(attributes.ToDictionary());
        }        
        
        /// <summary>
        /// Sets the Input HTML attributes.
        /// </summary>
        /// <param name="attributes">The HTML attributes.</param>
        public TPickerBuilder InputHtmlAttributes(IDictionary<string, object> attributes)
        {
            Guard.IsNotNull(attributes, "attributes");
            
            Component.InputHtmlAttributes.Clear();
            Component.InputHtmlAttributes.Merge(attributes);

            return this as TPickerBuilder;
        }

        /// <summary>
        /// Enables or disables the datepicker.
        /// </summary>
        public TPickerBuilder Enable(bool value)
        {
            Component.Enabled = value;

            return this as TPickerBuilder;
        }
    }
}