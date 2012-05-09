namespace Kendo.Mvc.UI
{
    using Kendo.Mvc.Infrastructure;
    using System;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="TextBoxBase.ClientEvents"/>.
    /// </summary>
    public class NumericTextBoxClientEventsBuilder : IHideObjectMembers
    {
        private readonly NumericTextBoxClientEvents clientEvents;

        public NumericTextBoxClientEventsBuilder(NumericTextBoxClientEvents clientEvents)
        {
            Guard.IsNotNull(clientEvents, "clientEvents");

            this.clientEvents = clientEvents;
        }

        /// <summary>
        /// Defines the inline handler of the OnChange client-side event
        /// </summary>
        /// <param name="onChangeCodeBlock">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().NumericTextBox()
        ///            .Name("NumericTextBox")
        ///            .ClientEvents(events => events.OnChange(() =>
        ///            {
        ///                 %&gt;
        ///                 function(e) {
        ///                     //event handling code
        ///                 }
        ///                 &lt;%
        ///            }))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public NumericTextBoxClientEventsBuilder OnChange(Action onChangeCodeBlock)
        {
            Guard.IsNotNull(onChangeCodeBlock, "onChangeCodeBlock");

            clientEvents.OnChange.CodeBlock = onChangeCodeBlock;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnChange client-side event
        /// </summary>
        /// <param name="onChangeInlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().NumericTextBox()
        ///            .Name("NumericTextBox")
        ///            .ClientEvents(events => events.OnChange(
        ///                 @&lt;text&gt;
        ///                 function(e) {
        ///                     //event handling code
        ///                 }
        ///                 &lt;/text&gt;
        ///            ))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public NumericTextBoxClientEventsBuilder OnChange(Func<object, object> onChangeInlineCodeBlock)
        {
            Guard.IsNotNull(onChangeInlineCodeBlock, "onChangeInlineCodeBlock");

            clientEvents.OnChange.InlineCodeBlock = onChangeInlineCodeBlock;

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the OnChange client-side event.
        /// </summary>
        /// <param name="onSelectHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().NumericTextBox()
        ///             .Name("NumericTextBox")
        ///             .ClientEvents(events => events.OnChange("onChange"))
        /// %&gt;
        /// </code>
        /// </example>
        public NumericTextBoxClientEventsBuilder OnChange(string onChangeHandlerName)
        {
            Guard.IsNotNullOrEmpty(onChangeHandlerName, "onChangeHandlerName");

            clientEvents.OnChange.HandlerName = onChangeHandlerName;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnSpin client-side event
        /// </summary>
        /// <param name="onSpinCodeBlock">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().NumericTextBox()
        ///            .Name("NumericTextBox")
        ///            .ClientEvents(events => events.OnSpin(() =>
        ///            {
        ///                 %&gt;
        ///                 function(e) {
        ///                     //event handling code
        ///                 }
        ///                 &lt;%
        ///            }))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public NumericTextBoxClientEventsBuilder OnSpin(Action onSpinCodeBlock)
        {
            Guard.IsNotNull(onSpinCodeBlock, "onSpinCodeBlock");

            clientEvents.OnSpin.CodeBlock = onSpinCodeBlock;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnSpin client-side event
        /// </summary>
        /// <param name="onSpinInlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().NumericTextBox()
        ///            .Name("NumericTextBox")
        ///            .ClientEvents(events => events.OnSpin(
        ///                 @&lt;text&gt;
        ///                 function(e) {
        ///                     //event handling code
        ///                 }
        ///                 &lt;/text&gt;
        ///            ))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public NumericTextBoxClientEventsBuilder OnSpin(Func<object, object> onSpinInlineCodeBlock)
        {
            Guard.IsNotNull(onSpinInlineCodeBlock, "onSpinInlineCodeBlock");

            clientEvents.OnSpin.InlineCodeBlock = onSpinInlineCodeBlock;

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the OnSpin client-side event.
        /// </summary>
        /// <param name="onSpinHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().NumericTextBox()
        ///             .Name("NumericTextBox")
        ///             .ClientEvents(events => events.OnSpin("OnSpin"))
        /// %&gt;
        /// </code>
        /// </example>
        public NumericTextBoxClientEventsBuilder OnSpin(string onSpinHandlerName)
        {
            Guard.IsNotNullOrEmpty(onSpinHandlerName, "onSpinHandlerName");

            clientEvents.OnSpin.HandlerName = onSpinHandlerName;

            return this;
        }
    }
}
