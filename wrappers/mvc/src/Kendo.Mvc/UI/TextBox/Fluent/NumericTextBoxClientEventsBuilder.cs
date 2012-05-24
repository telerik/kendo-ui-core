namespace Kendo.Mvc.UI
{
    using Kendo.Mvc;
    using Kendo.Mvc.Infrastructure;
    using System;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="TextBoxBase.ClientEvents"/>.
    /// </summary>
    public class NumericTextBoxClientEventsBuilder : IHideObjectMembers
    {
        private readonly IDictionary<string, object> clientEvents;

        public NumericTextBoxClientEventsBuilder(IDictionary<string, object> clientEvents)
        {
            Guard.IsNotNull(clientEvents, "clientEvents");

            this.clientEvents = clientEvents;
        }

        /// <summary>
        /// Defines the inline handler of the Change client-side event
        /// </summary>
        /// <param name="onChangeInlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().NumericTextBox()
        ///            .Name("NumericTextBox")
        ///            .ClientEvents(events => events.Change(
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
        public NumericTextBoxClientEventsBuilder Change(Func<object, object> changeInlineCodeBlock)
        {
            Guard.IsNotNull(changeInlineCodeBlock, "changeInlineCodeBlock");

            clientEvents["change"] = new ClientEvent { InlineCodeBlock = changeInlineCodeBlock };

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Change client-side event.
        /// </summary>
        /// <param name="changeHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().NumericTextBox()
        ///             .Name("NumericTextBox")
        ///             .ClientEvents(events => events.Change("change"))
        /// %&gt;
        /// </code>
        /// </example>
        public NumericTextBoxClientEventsBuilder Change(string changeHandlerName)
        {
            Guard.IsNotNullOrEmpty(changeHandlerName, "changeHandlerName");

            clientEvents["change"] = new ClientEvent { HandlerName = changeHandlerName };

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the Spin client-side event
        /// </summary>
        /// <param name="spinInlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().NumericTextBox()
        ///            .Name("NumericTextBox")
        ///            .ClientEvents(events => events.Spin(
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
        public NumericTextBoxClientEventsBuilder Spin(Func<object, object> spinInlineCodeBlock)
        {
            Guard.IsNotNull(spinInlineCodeBlock, "spinInlineCodeBlock");

            clientEvents["spin"] = new ClientEvent { InlineCodeBlock = spinInlineCodeBlock };

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Spin client-side event.
        /// </summary>
        /// <param name="spinHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().NumericTextBox()
        ///             .Name("NumericTextBox")
        ///             .ClientEvents(events => events.Spin("spin"))
        /// %&gt;
        /// </code>
        /// </example>
        public NumericTextBoxClientEventsBuilder Spin(string spinHandlerName)
        {
            Guard.IsNotNullOrEmpty(spinHandlerName, "spinHandlerName");

            clientEvents["spin"] = new ClientEvent { HandlerName = spinHandlerName };

            return this;
        }
    }
}
