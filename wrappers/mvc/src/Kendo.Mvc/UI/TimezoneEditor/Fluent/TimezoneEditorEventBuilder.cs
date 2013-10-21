namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;

    /// <summary>
    /// The fluent API for subscribing to Kendo UI TimezoneEditor events.
    /// </summary>
    public class TimezoneEditorEventBuilder : EventBuilder
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="TimezoneEditorEventBuilder"/> class.
        /// </summary>
        /// <param name="events">The events.</param>
        public TimezoneEditorEventBuilder(IDictionary<string, object> events)
            : base(events)
        {
        }

        /// <summary>
        /// Defines the inline handler of the change event.
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="Razor">
        ///  @(Html.Kendo().TimezoneEditor()
        ///            .Name("TimezoneEditor")
        ///            .Events(events => events.Change(
        ///                 @&lt;text&gt;
        ///                 function(e) {
        ///                     //event handling code
        ///                 }
        ///                 &lt;/text&gt;
        ///            ))
        /// )
        /// </code>
        /// </example>
        public TimezoneEditorEventBuilder Change(Func<object, object> handler)
        {
            Handler("change", handler);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the change event.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="Razor">
        ///  @(Html.Kendo().TimezoneEditor()
        ///             .Name("TimezoneEditor")
        ///             .Events(events => events.Change("change"))
        /// )
        /// </code>
        /// </example>
        public TimezoneEditorEventBuilder Change(string handler)
        {
            Handler("change", handler);

            return this;
        }
    }
}
