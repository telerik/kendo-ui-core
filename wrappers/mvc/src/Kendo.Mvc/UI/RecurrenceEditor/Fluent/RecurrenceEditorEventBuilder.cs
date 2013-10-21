namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;

    /// <summary>
    /// The fluent API for subscribing to Kendo UI RecurrenceEditor events.
    /// </summary>
    public class RecurrenceEditorEventBuilder : EventBuilder
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="RecurrenceEditorEventBuilder"/> class.
        /// </summary>
        /// <param name="events">The events.</param>
        public RecurrenceEditorEventBuilder(IDictionary<string, object> events)
            : base(events)
        {
        }

        /// <summary>
        /// Defines the inline handler of the change event.
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="Razor">
        ///  @(Html.Kendo().RecurrenceEditor()
        ///            .Name("RecurrenceEditor")
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
        public RecurrenceEditorEventBuilder Change(Func<object, object> handler)
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
        ///  @(Html.Kendo().RecurrenceEditor()
        ///             .Name("RecurrenceEditor")
        ///             .Events(events => events.Change("change"))
        /// )
        /// </code>
        /// </example>
        public RecurrenceEditorEventBuilder Change(string handler)
        {
            Handler("change", handler);

            return this;
        }
    }
}
