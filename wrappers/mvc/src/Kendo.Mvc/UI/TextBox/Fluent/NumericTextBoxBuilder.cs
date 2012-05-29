namespace Kendo.Mvc.UI
{

    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.UI;
    using System;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="NumericTextBox"/> component.
    /// </summary>
    public class NumericTextBoxBuilder<T> : ViewComponentBuilderBase<NumericTextBox<T>, NumericTextBoxBuilder<T>> where T : struct
    {
        /// Initializes a new instance of the <see cref="NumericTextBoxBuilder"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public NumericTextBoxBuilder(NumericTextBox<T> component)
            : base(component)
        { }

        /// <summary>
        /// Sets the initial value of the NumericTextBox.
        /// </summary>
        public NumericTextBoxBuilder<T> Value(T? value)
        {
            Component.Value = value;

            return this;
        }

        /// <summary>
        /// Sets the step, used ti increment/decrement the value of the textbox.
        /// </summary>
        public NumericTextBoxBuilder<T> Step(T step)
        {
            Guard.IsNotNull(step, "step");

            Component.Step = step;

            return this;
        }

        /// <summary>
        /// Sets the minimal possible value allowed to the user.
        /// </summary>
        public NumericTextBoxBuilder<T> Min(T? min)
        {
            Component.Min = min;

            return this;
        }

        /// <summary>
        /// Sets the maximal possible value allowed to the user.
        /// </summary>
        public NumericTextBoxBuilder<T> Max(T? max)
        {
            Component.Max = max;

            return this;
        }

        /// <summary>
        /// Sets the text which will be displayed if the textbox is empty.
        /// </summary>
        public NumericTextBoxBuilder<T> Placeholder(string placeholder)
        {
            Component.Placeholder = placeholder;

            return this;
        }

        /// <summary>
        /// Enables or disables the spin buttons.
        /// </summary>
        /// <param name="allowSpinner"></param>
        /// <returns></returns>
        public NumericTextBoxBuilder<T> Spinners(bool value)
        {
            Component.Spinners = value;

            return this;
        }

        /// <summary>
        /// Configures the client-side events.
        /// </summary>
        /// <param name="clientEventsAction">The client events action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().NumericTextBox()
        ///             .Name("NumericTextBox")
        ///             .ClientEvents(events =>
        ///                 events.OnLoad("onLoad").OnChange("onChange")
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public NumericTextBoxBuilder<T> Events(Action<NumericTextBoxClientEventsBuilder> clientEventsAction)
        {
            Guard.IsNotNull(clientEventsAction, "clientEventsAction");

            clientEventsAction(new NumericTextBoxClientEventsBuilder(Component.ClientEvents));

            return this;
        }

        /// <summary>
        /// Enables or disables the textbox.
        /// </summary>
        /// <param name="allowSpinner"></param>
        /// <returns></returns>
        public NumericTextBoxBuilder<T> Enable(bool value)
        {
            Component.Enabled = value;

            return this;
        }

        /// <summary>
        /// Stes the format of the NumericTextBox.
        /// </summary>
        /// <param name="allowSpinner"></param>
        /// <returns></returns>
        public NumericTextBoxBuilder<T> Format(string format)
        {
            Guard.IsNotNullOrEmpty(format, "format");

            Component.Format = format;

            return this;
        }

        public NumericTextBoxBuilder<T> Culture(string culture)
        {
            Component.Culture = culture;

            return this;
        }

        public NumericTextBoxBuilder<T> Decimals(int decimals)
        {
            Guard.IsNotNegative(decimals, "decimals");

            Component.Decimals = decimals;

            return this;
        }
    }
}