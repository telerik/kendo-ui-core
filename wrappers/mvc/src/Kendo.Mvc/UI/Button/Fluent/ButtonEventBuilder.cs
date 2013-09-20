namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;
    /// <summary>
    /// Defines the fluent interface for configuring the Button events.
    /// </summary>
    public class ButtonEventBuilder : EventBuilder
    {
        public ButtonEventBuilder(IDictionary<string, object> events) : base(events)
        {
        }

        /// <summary>
        /// Defines the inline handler of the Click client-side event
        /// </summary>
        /// <param name="onClickAction">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().Button()
        ///            .Name("Button")
        ///            .Events(events => events.Click(
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
        public virtual ButtonEventBuilder Click(Func<object, object> handler)
        {
            Handler("click", handler);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Click client-side event.
        /// </summary>
        /// <param name="onClickHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Button()
        ///             .Name("Button")
        ///             .Events(events => events.Click("onClick"))
        /// %&gt;
        /// </code>
        /// </example>
        public virtual ButtonEventBuilder Click(string handler)
        {
            Handler("click", handler);

            return this;
        }
    }
}
