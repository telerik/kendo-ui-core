using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Kendo.Mvc.UI.Fluent
{

    /// <summary>
    /// Defines the fluent interface for configuring sortable client events.
    /// </summary>
    public class SortableEventBuilder : EventBuilder
    {
        public SortableEventBuilder(IDictionary<string, object> events) 
            : base(events)
        {
        }

        /// <summary>
        /// Defines the inline handler of the Start client-side event
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  @(Html.Kendo().Sortable()
        ///            .For("#element")
        ///            .Events(events => events.Start(
        ///                 @&lt;text&gt;
        ///                 function(e) {
        ///                     //event handling code
        ///                 }
        ///                 &lt;/text&gt;
        ///            ))
        ///  )
        /// </code>
        /// </example>
        public SortableEventBuilder Start(Func<object, object> handler)
        {
            Handler("start", handler);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Start client-side event.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        /// @(Html.Kendo().Sortable()
        ///             .For("#element")
        ///             .Events(events => events.Start("start"))
        /// )
        /// </code>
        /// </example>
        public SortableEventBuilder Start(string handler)
        {
            Handler("start", handler);

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the Move client-side event
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  @(Html.Kendo().Sortable()
        ///            .For("#element")
        ///            .Events(events => events.Move(
        ///                 @&lt;text&gt;
        ///                 function(e) {
        ///                     //event handling code
        ///                 }
        ///                 &lt;/text&gt;
        ///            ))
        ///  )
        /// </code>
        /// </example>
        public SortableEventBuilder Move(Func<object, object> handler)
        {
            Handler("move", handler);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Move client-side event.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        /// @(Html.Kendo().Sortable()
        ///             .For("#element")
        ///             .Events(events => events.Move("move"))
        /// )
        /// </code>
        /// </example>
        public SortableEventBuilder Move(string handler)
        {
            Handler("move", handler);

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the End client-side event
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  @(Html.Kendo().Sortable()
        ///            .For("#element")
        ///            .Events(events => events.End(
        ///                 @&lt;text&gt;
        ///                 function(e) {
        ///                     //event handling code
        ///                 }
        ///                 &lt;/text&gt;
        ///            ))
        ///  )
        /// </code>
        /// </example>
        public SortableEventBuilder End(Func<object, object> handler)
        {
            Handler("end", handler);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the End client-side event.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        /// @(Html.Kendo().Sortable()
        ///             .For("#element")
        ///             .Events(events => events.End("end"))
        /// )
        /// </code>
        /// </example>
        public SortableEventBuilder End(string handler)
        {
            Handler("end", handler);

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the Change client-side event
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  @(Html.Kendo().Sortable()
        ///            .For("#element")
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
        public SortableEventBuilder Change(Func<object, object> handler)
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
        /// @(Html.Kendo().Sortable()
        ///             .For("#element")
        ///             .Events(events => events.Change("change"))
        /// )
        /// </code>
        /// </example>
        public SortableEventBuilder Change(string handler)
        {
            Handler("change", handler);

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the Cancel client-side event
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  @(Html.Kendo().Sortable()
        ///            .For("#element")
        ///            .Events(events => events.Cancel(
        ///                 @&lt;text&gt;
        ///                 function(e) {
        ///                     //event handling code
        ///                 }
        ///                 &lt;/text&gt;
        ///            ))
        ///  )
        /// </code>
        /// </example>
        public SortableEventBuilder Cancel(Func<object, object> handler)
        {
            Handler("cancel", handler);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Cancel client-side event.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        /// @(Html.Kendo().Sortable()
        ///             .For("#element")
        ///             .Events(events => events.Cancel("cancel"))
        /// )
        /// </code>
        /// </example>
        public SortableEventBuilder Cancel(string handler)
        {
            Handler("cancel", handler);

            return this;
        }
    }
}