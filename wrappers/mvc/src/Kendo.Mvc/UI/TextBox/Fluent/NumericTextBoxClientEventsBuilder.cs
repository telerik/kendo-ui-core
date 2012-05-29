namespace Kendo.Mvc.UI
{
    using Kendo.Mvc;
    using Kendo.Mvc.Infrastructure;
    using System;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="TextBoxBase.Events"/>.
    /// </summary>
    public class NumericTextBoxEventsBuilder : IHideObjectMembers
    {
        private readonly IDictionary<string, object> Events;

        public NumericTextBoxEventsBuilder(IDictionary<string, object> Events)
        {
            Guard.IsNotNull(Events, "Events");

            this.Events = Events;
        }

        /// <summary>
        /// Defines the inline handler of the Change client-side event
        /// </summary>
        /// <param name="onChangeInlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().NumericTextBox()
        ///            .Name("NumericTextBox")
        ///            .Events(events => events.Change(
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
        public NumericTextBoxEventsBuilder Change(Func<object, object> changeInlineCodeBlock)
        {
            Guard.IsNotNull(changeInlineCodeBlock, "changeInlineCodeBlock");

            Events["change"] = new ClientEvent { InlineCodeBlock = changeInlineCodeBlock };

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
        ///             .Events(events => events.Change("change"))
        /// %&gt;
        /// </code>
        /// </example>
        public NumericTextBoxEventsBuilder Change(string changeHandlerName)
        {
            Guard.IsNotNullOrEmpty(changeHandlerName, "changeHandlerName");

            Events["change"] = new ClientEvent { HandlerName = changeHandlerName };

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
        ///            .Events(events => events.Spin(
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
        public NumericTextBoxEventsBuilder Spin(Func<object, object> spinInlineCodeBlock)
        {
            Guard.IsNotNull(spinInlineCodeBlock, "spinInlineCodeBlock");

            Events["spin"] = new ClientEvent { InlineCodeBlock = spinInlineCodeBlock };

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
        ///             .Events(events => events.Spin("spin"))
        /// %&gt;
        /// </code>
        /// </example>
        public NumericTextBoxEventsBuilder Spin(string spinHandlerName)
        {
            Guard.IsNotNullOrEmpty(spinHandlerName, "spinHandlerName");

            Events["spin"] = new ClientEvent { HandlerName = spinHandlerName };

            return this;
        }
    }
}
