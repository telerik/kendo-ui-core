namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;
    using Infrastructure;

    /// <summary>
    /// Defines the fluent interface for configuring tooltip client events.
    /// </summary>
    public class TooltipEventBuilder : EventBuilder
    {
        public TooltipEventBuilder(IDictionary<string, object> events)
            : base(events)
        {
        }

        /// <summary>
        /// Defines the inline handler of the Show client-side event
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  @(Html.Kendo().Tooltip()
        ///            .For("#element")
        ///            .Events(events => events.Show(
        ///                 @&lt;text&gt;
        ///                 function(e) {
        ///                     //event handling code
        ///                 }
        ///                 &lt;/text&gt;
        ///            ))
        ///  )
        /// </code>
        /// </example>
        public TooltipEventBuilder Show(Func<object, object> handler)
        {
            Handler("show", handler);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Show client-side event.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        /// @(Html.Kendo().Tooltip()
        ///             .For("#element")
        ///             .Events(events => events.Show("show"))
        /// )
        /// </code>
        /// </example>
        public TooltipEventBuilder Show(string handler)
        {
            Handler("show", handler);

            return this;
        }


        /// <summary>
        /// Defines the inline handler of the Hide client-side event
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  @(Html.Kendo().Tooltip()
        ///            .For("#element")
        ///            .Events(events => events.Hide(
        ///                 @&lt;text&gt;
        ///                 function(e) {
        ///                     //event handling code
        ///                 }
        ///                 &lt;/text&gt;
        ///            ))
        ///  )
        /// </code>
        /// </example>
        public TooltipEventBuilder Hide(Func<object, object> handler)
        {
            Handler("hide", handler);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Hide client-side event.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        /// @(Html.Kendo().Tooltip()
        ///             .For("#element")
        ///             .Events(events => events.Hide("hide"))
        /// )
        /// </code>
        /// </example>
        public TooltipEventBuilder Hide(string handler)
        {
            Handler("hide", handler);

            return this;
        }


        /// <summary>
        /// Defines the inline handler of the ContentLoad client-side event
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  @(Html.Kendo().Tooltip()
        ///            .For("#element")
        ///            .Events(events => events.ContentLoad(
        ///                 @&lt;text&gt;
        ///                 function(e) {
        ///                     //event handling code
        ///                 }
        ///                 &lt;/text&gt;
        ///            ))
        ///  )
        /// </code>
        /// </example>
        public TooltipEventBuilder ContentLoad(Func<object, object> handler)
        {
            Handler("contentLoad", handler);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the ContentLoad client-side event.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        /// @(Html.Kendo().Tooltip()
        ///             .For("#element")
        ///             .Events(events => events.ContentLoad("contentLoad"))
        /// )
        /// </code>
        /// </example>
        public TooltipEventBuilder ContentLoad(string handler)
        {
            Handler("contentLoad", handler);

            return this;
        }


        /// <summary>
        /// Defines the inline handler of the Error client-side event
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  @(Html.Kendo().Tooltip()
        ///            .For("#element")
        ///            .Events(events => events.Error(
        ///                 @&lt;text&gt;
        ///                 function(e) {
        ///                     //event handling code
        ///                 }
        ///                 &lt;/text&gt;
        ///            ))
        ///  )
        /// </code>
        /// </example>
        public TooltipEventBuilder Error(Func<object, object> handler)
        {
            Handler("error", handler);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Error client-side event.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        /// @(Html.Kendo().Tooltip()
        ///             .For("#element")
        ///             .Events(events => events.Error("error"))
        /// )
        /// </code>
        /// </example>
        public TooltipEventBuilder Error(string handler)
        {
            Handler("error", handler);

            return this;
        }
    }
}
