namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;
    /// <summary>
    /// Defines the fluent interface for configuring the Notification events.
    /// </summary>
    public class NotificationEventBuilder : EventBuilder
    {
        public NotificationEventBuilder(IDictionary<string, object> events) : base(events)
        {
        }

        /// <summary>
        /// Defines the inline handler of the Hide client-side event
        /// </summary>
        /// <param name="onHideAction">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().Notification()
        ///            .Name("Notification")
        ///            .Events(events => events.Hide(
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
        public virtual NotificationEventBuilder Hide(Func<object, object> handler)
        {
            Handler("hide", handler);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Hide client-side event.
        /// </summary>
        /// <param name="onHideHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Notification()
        ///             .Name("Notification")
        ///             .Events(events => events.Hide("onHide"))
        /// %&gt;
        /// </code>
        /// </example>
        public virtual NotificationEventBuilder Hide(string handler)
        {
            Handler("hide", handler);

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the Show client-side event
        /// </summary>
        /// <param name="onShowAction">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().Notification()
        ///            .Name("Notification")
        ///            .Events(events => events.Show(
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
        public virtual NotificationEventBuilder Show(Func<object, object> handler)
        {
            Handler("show", handler);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Show client-side event.
        /// </summary>
        /// <param name="onHideHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Notification()
        ///             .Name("Notification")
        ///             .Events(events => events.Show("onShow"))
        /// %&gt;
        /// </code>
        /// </example>
        public virtual NotificationEventBuilder Show(string handler)
        {
            Handler("show", handler);

            return this;
        }
    
    }
}