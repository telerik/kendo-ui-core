namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent interface for configuring the NumericTextBox events.
    /// </summary>
    public class MaskedTextBoxEventBuilder : EventBuilder
    {
        public MaskedTextBoxEventBuilder(IDictionary<string, object> events)
            : base(events)
        {
        }

        /// <summary>
        /// Defines the inline handler of the Change client-side event
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  @(Html.Kendo().MaskedTextBox()
        ///            .Name("MaskedTextBox")
        ///            .Events(events => events.Change(
        ///                 @&lt;text&gt;
        ///                 function(e) {
        ///                     //event handling code
        ///                 }
        ///                 &lt;/text&gt;
        ///            ))
        ///  )
        /// </code>
        /// </example>
        public MaskedTextBoxEventBuilder Change(Func<object, object> handler)
        {
            Handler("change", handler);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Change client-side event.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  @(Html.Kendo().MaskedTextBox()
        ///             .Name("MaskedTextBox")
        ///             .Events(events => events.Change("change"))
        ///  )
        /// </code>
        /// </example>
        public MaskedTextBoxEventBuilder Change(string handler)
        {
            Handler("change", handler);

            return this;
        }
    }
}
