namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;
    /// <summary>
    /// Defines the fluent interface for configuring the Menu events.
    /// </summary>
    public class MenuEventBuilder : EventBuilder
    {
        public MenuEventBuilder(IDictionary<string, object> events) : base(events)
        {
        }

        /// <summary>
        /// Defines the inline handler of the Open client-side event
        /// </summary>
        /// <param name="onOpenAction">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().Menu()
        ///            .Name("Menu")
        ///            .Events(events => events.Open(
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
        public virtual MenuEventBuilder Open(Func<object, object> handler)
        {
            Handler("open", handler);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Open client-side event.
        /// </summary>
        /// <param name="onOpenHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Menu()
        ///             .Name("Menu")
        ///             .Events(events => events.Open("onOpen"))
        /// %&gt;
        /// </code>
        /// </example>
        public virtual MenuEventBuilder Open(string handler)
        {
            Handler("open", handler);

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the Close client-side event
        /// </summary>
        /// <param name="onCloseAction">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().Menu()
        ///            .Name("Menu")
        ///            .Events(events => events.Close(
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
        public virtual MenuEventBuilder Close(Func<object, object> handler)
        {
            Handler("close", handler);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Close client-side event.
        /// </summary>
        /// <param name="onCloseHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Menu()
        ///             .Name("Menu")
        ///             .Events(events => events.Close("onClose"))
        /// %&gt;
        /// </code>
        /// </example>
        public virtual MenuEventBuilder Close(string handler)
        {
            Handler("close", handler); 
            return this;
        }
        
        /// <summary>
        /// Defines the inline handler of the Activate client-side event
        /// </summary>
        /// <param name="onActivateAction">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().Menu()
        ///            .Name("Menu")
        ///            .Events(events => events.Activate(
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
        public virtual MenuEventBuilder Activate(Func<object, object> handler)
        {
            Handler("activate", handler);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Activate client-side event.
        /// </summary>
        /// <param name="onActivateHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Menu()
        ///             .Name("Menu")
        ///             .Events(events => events.Activate("onActivate"))
        /// %&gt;
        /// </code>
        /// </example>
        public virtual MenuEventBuilder Activate(string handler)
        {
            Handler("activate", handler);

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the Deactivate client-side event
        /// </summary>
        /// <param name="onDeactivateAction">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().Menu()
        ///            .Name("Menu")
        ///            .Events(events => events.Deactivate(
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
        public virtual MenuEventBuilder Deactivate(Func<object, object> handler)
        {
            Handler("deactivate", handler);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Deactivate client-side event.
        /// </summary>
        /// <param name="onDeactivateHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Menu()
        ///             .Name("Menu")
        ///             .Events(events => events.Deactivate("onDeactivate"))
        /// %&gt;
        /// </code>
        /// </example>
        public virtual MenuEventBuilder Deactivate(string handler)
        {
            Handler("deactivate", handler);
            return this;
        }

        /// <summary>
        /// Defines the inline handler of the Select client-side event
        /// </summary>
        /// <param name="onSelectAction">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().Menu()
        ///            .Name("Menu")
        ///            .Events(events => events.Select(
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
        public virtual MenuEventBuilder Select(Func<object, object> handler)
        {
            Handler("select", handler);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Select client-side event.
        /// </summary>
        /// <param name="onSelectHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Menu()
        ///             .Name("Menu")
        ///             .Events(events => events.Select("onSelect"))
        /// %&gt;
        /// </code>
        /// </example>
        public virtual MenuEventBuilder Select(string handler)
        {
            Handler("select", handler);

            return this;
        }
    }
}
