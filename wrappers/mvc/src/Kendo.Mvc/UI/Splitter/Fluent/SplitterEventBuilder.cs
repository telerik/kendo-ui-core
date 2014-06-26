namespace Kendo.Mvc.UI.Fluent
{
    using System;

    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent API for configuring the Kendo Splitter for ASP.NET MVC events
    /// </summary>
    public class SplitterEventBuilder : EventBuilder
    {
        public SplitterEventBuilder(IDictionary<string, object> events) : base(events)
        {
        }

        /// <summary>
        /// Defines the inline handler of the Resize client-side event
        /// </summary>
        /// <param name="onResizeInlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().Splitter()
        ///            .Name("Splitter")
        ///            .Events(events => events.Resize(
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
        public SplitterEventBuilder Resize(Func<object, object> handler)
        {
            Handler("resize", handler);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Resize client-side event.
        /// </summary>
        /// <param name="onResizeHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Splitter()
        ///             .Name("Splitter")
        ///             .Events(events => events.Resize("onResize"))
        /// %&gt;
        /// </code>
        /// </example>
        public SplitterEventBuilder Resize(string handler)
        {
            Handler("resize", handler);

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the Expand client-side event
        /// </summary>
        /// <param name="onExpandInlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().Splitter()
        ///            .Name("Splitter")
        ///            .Events(events => events.Expand(
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
        public SplitterEventBuilder Expand(Func<object, object> handler)
        {
            Handler("expand", handler);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Expand client-side event.
        /// </summary>
        /// <param name="onExpandHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Splitter()
        ///             .Name("Splitter")
        ///             .Events(events => events.Expand("onExpand"))
        /// %&gt;
        /// </code>
        /// </example>
        public SplitterEventBuilder Expand(string handler)
        {
            Handler("expand", handler);

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the Collapse client-side event
        /// </summary>
        /// <param name="onCollapseInlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().Splitter()
        ///            .Name("Splitter")
        ///            .Events(events => events.Collapse(
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
        public SplitterEventBuilder Collapse(Func<object, object> handler)
        {
            Handler("collapse", handler);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Collapse client-side event.
        /// </summary>
        /// <param name="onCollapseHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Splitter()
        ///             .Name("Splitter")
        ///             .Events(events => events.Collapse("onCollapse"))
        /// %&gt;
        /// </code>
        /// </example>
        public SplitterEventBuilder Collapse(string handler)
        {
            Handler("collapse", handler);

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the ContentLoad client-side event
        /// </summary>
        /// <param name="onContentLoadInlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().Splitter()
        ///            .Name("Splitter")
        ///            .Events(events => events.ContentLoad(
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
        public SplitterEventBuilder ContentLoad(Func<object, object> handler)
        {
            Handler("contentLoad", handler);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the ContentLoad client-side event.
        /// </summary>
        /// <param name="onContentLoadHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Splitter()
        ///             .Name("Splitter")
        ///             .Events(events => events.ContentLoad("onContentLoad"))
        /// %&gt;
        /// </code>
        /// </example>
        public SplitterEventBuilder ContentLoad(string handler)
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
        ///  &lt;% Html.Kendo().Splitter()
        ///            .Name("Splitter")
        ///            .Events(events => events.Error(
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
        public SplitterEventBuilder Error(Func<object, object> handler)
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
        ///  &lt;%= Html.Kendo().Splitter()
        ///             .Name("Splitter")
        ///             .Events(events => events.Error("onError"))
        /// %&gt;
        /// </code>
        /// </example>
        public SplitterEventBuilder Error(string handler)
        {
            Handler("error", handler);

            return this;
        }

        public SplitterEventBuilder LayoutChange(Func<object, object> handler)
        {
            Handler("layoutChange", handler);

            return this;
        }

        public SplitterEventBuilder LayoutChange(string handler)
        {
            Handler("layoutChange", handler);

            return this;
        }
    }
}
