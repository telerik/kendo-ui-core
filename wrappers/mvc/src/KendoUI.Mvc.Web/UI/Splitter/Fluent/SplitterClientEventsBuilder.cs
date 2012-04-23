// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Fluent
{
    using System;
    using System.Web.Mvc;

    using Infrastructure;

    /// <summary>
    /// The fluent interface that configures the <see cref="Splitter.ClientEvents"/>.
    /// </summary>
    public class SplitterClientEventsBuilder : IHideObjectMembers
    {
        private readonly SplitterClientEvents clientEvents;

        public SplitterClientEventsBuilder(SplitterClientEvents clientEvents)
        {
            Guard.IsNotNull(clientEvents, "clientEvents");

            this.clientEvents = clientEvents;
        }

        /// <summary>
        /// Defines the inline handler of the OnLoad client-side event
        /// </summary>
        /// <param name="onLoadCodeBlock">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().Splitter()
        ///            .Name("Splitter")
        ///            .ClientEvents(events => events.OnLoad(() =>
        ///            {
        ///                 %&gt;
        ///                 function(e) {
        ///                     //event handling code
        ///                 }
        ///                 &lt;%
        ///            }))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public SplitterClientEventsBuilder OnLoad(Action onLoadCodeBlock)
        {
            Guard.IsNotNull(onLoadCodeBlock, "onLoadCodeBlock");

            clientEvents.OnLoad.CodeBlock = onLoadCodeBlock;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnLoad client-side event
        /// </summary>
        /// <param name="onLoadInlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().Splitter()
        ///            .Name("Splitter")
        ///            .ClientEvents(events => events.OnLoad(
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
        public SplitterClientEventsBuilder OnLoad(Func<object, object> onLoadInlineCodeBlock)
        {
            Guard.IsNotNull(onLoadInlineCodeBlock, "onLoadInlineCodeBlock");

            clientEvents.OnLoad.InlineCodeBlock = onLoadInlineCodeBlock;

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the OnLoad client-side event.
        /// </summary>
        /// <param name="onLoadHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Splitter()
        ///             .Name("Splitter")
        ///             .ClientEvents(events => events.OnLoad("onLoad"))
        /// %&gt;
        /// </code>
        /// </example>
        public SplitterClientEventsBuilder OnLoad(string onLoadHandlerName)
        {
            Guard.IsNotNullOrEmpty(onLoadHandlerName, "onLoadHandlerName");

            clientEvents.OnLoad.HandlerName = onLoadHandlerName;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnResize client-side event
        /// </summary>
        /// <param name="onResizeCodeBlock">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().Splitter()
        ///            .Name("Splitter")
        ///            .ClientEvents(events => events.OnResize(() =>
        ///            {
        ///                 %&gt;
        ///                 function(e) {
        ///                     //event handling code
        ///                 }
        ///                 &lt;%
        ///            }))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public SplitterClientEventsBuilder OnResize(Action onResizeCodeBlock)
        {
            Guard.IsNotNull(onResizeCodeBlock, "onResizeCodeBlock");

            clientEvents.OnResize.CodeBlock = onResizeCodeBlock;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnResize client-side event
        /// </summary>
        /// <param name="onResizeInlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().Splitter()
        ///            .Name("Splitter")
        ///            .ClientEvents(events => events.OnResize(
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
        public SplitterClientEventsBuilder OnResize(Func<object, object> onResizeInlineCodeBlock)
        {
            Guard.IsNotNull(onResizeInlineCodeBlock, "onResizeInlineCodeBlock");

            clientEvents.OnResize.InlineCodeBlock = onResizeInlineCodeBlock;

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the OnResize client-side event.
        /// </summary>
        /// <param name="onResizeHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Splitter()
        ///             .Name("Splitter")
        ///             .ClientEvents(events => events.OnResize("onResize"))
        /// %&gt;
        /// </code>
        /// </example>
        public SplitterClientEventsBuilder OnResize(string onResizeHandlerName)
        {
            Guard.IsNotNullOrEmpty(onResizeHandlerName, "onResizeHandlerName");

            clientEvents.OnResize.HandlerName = onResizeHandlerName;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnExpand client-side event
        /// </summary>
        /// <param name="onExpandCodeBlock">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().Splitter()
        ///            .Name("Splitter")
        ///            .ClientEvents(events => events.OnExpand(() =>
        ///            {
        ///                 %&gt;
        ///                 function(e) {
        ///                     //event handling code
        ///                 }
        ///                 &lt;%
        ///            }))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public SplitterClientEventsBuilder OnExpand(Action onExpandCodeBlock)
        {
            Guard.IsNotNull(onExpandCodeBlock, "onExpandCodeBlock");

            clientEvents.OnExpand.CodeBlock = onExpandCodeBlock;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnExpand client-side event
        /// </summary>
        /// <param name="onExpandInlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().Splitter()
        ///            .Name("Splitter")
        ///            .ClientEvents(events => events.OnExpand(
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
        public SplitterClientEventsBuilder OnExpand(Func<object, object> onExpandInlineCodeBlock)
        {
            Guard.IsNotNull(onExpandInlineCodeBlock, "onExpandInlineCodeBlock");

            clientEvents.OnExpand.InlineCodeBlock = onExpandInlineCodeBlock;

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the OnExpand client-side event.
        /// </summary>
        /// <param name="onExpandHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Splitter()
        ///             .Name("Splitter")
        ///             .ClientEvents(events => events.OnExpand("onExpand"))
        /// %&gt;
        /// </code>
        /// </example>
        public SplitterClientEventsBuilder OnExpand(string onExpandHandlerName)
        {
            Guard.IsNotNullOrEmpty(onExpandHandlerName, "onExpandHandlerName");

            clientEvents.OnExpand.HandlerName = onExpandHandlerName;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnCollapse client-side event
        /// </summary>
        /// <param name="onCollapseCodeBlock">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().Splitter()
        ///            .Name("Splitter")
        ///            .ClientEvents(events => events.OnCollapse(() =>
        ///            {
        ///                 %&gt;
        ///                 function(e) {
        ///                     //event handling code
        ///                 }
        ///                 &lt;%
        ///            }))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public SplitterClientEventsBuilder OnCollapse(Action onCollapseCodeBlock)
        {
            Guard.IsNotNull(onCollapseCodeBlock, "onCollapseCodeBlock");

            clientEvents.OnCollapse.CodeBlock = onCollapseCodeBlock;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnCollapse client-side event
        /// </summary>
        /// <param name="onCollapseInlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().Splitter()
        ///            .Name("Splitter")
        ///            .ClientEvents(events => events.OnCollapse(
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
        public SplitterClientEventsBuilder OnCollapse(Func<object, object> onCollapseInlineCodeBlock)
        {
            Guard.IsNotNull(onCollapseInlineCodeBlock, "onCollapseInlineCodeBlock");

            clientEvents.OnCollapse.InlineCodeBlock = onCollapseInlineCodeBlock;

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the OnCollapse client-side event.
        /// </summary>
        /// <param name="onCollapseHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Splitter()
        ///             .Name("Splitter")
        ///             .ClientEvents(events => events.OnCollapse("onCollapse"))
        /// %&gt;
        /// </code>
        /// </example>
        public SplitterClientEventsBuilder OnCollapse(string onCollapseHandlerName)
        {
            Guard.IsNotNullOrEmpty(onCollapseHandlerName, "onCollapseHandlerName");

            clientEvents.OnCollapse.HandlerName = onCollapseHandlerName;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnContentLoad client-side event
        /// </summary>
        /// <param name="onContentLoadCodeBlock">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().Splitter()
        ///            .Name("Splitter")
        ///            .ClientEvents(events => events.OnContentLoad(() =>
        ///            {
        ///                 %&gt;
        ///                 function(e) {
        ///                     //event handling code
        ///                 }
        ///                 &lt;%
        ///            }))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public SplitterClientEventsBuilder OnContentLoad(Action onContentLoadCodeBlock)
        {
            Guard.IsNotNull(onContentLoadCodeBlock, "onContentLoadCodeBlock");

            clientEvents.OnContentLoad.CodeBlock = onContentLoadCodeBlock;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnContentLoad client-side event
        /// </summary>
        /// <param name="onContentLoadInlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().Splitter()
        ///            .Name("Splitter")
        ///            .ClientEvents(events => events.OnContentLoad(
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
        public SplitterClientEventsBuilder OnContentLoad(Func<object, object> onContentLoadInlineCodeBlock)
        {
            Guard.IsNotNull(onContentLoadInlineCodeBlock, "onContentLoadInlineCodeBlock");

            clientEvents.OnContentLoad.InlineCodeBlock = onContentLoadInlineCodeBlock;

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the OnContentLoad client-side event.
        /// </summary>
        /// <param name="onContentLoadHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Splitter()
        ///             .Name("Splitter")
        ///             .ClientEvents(events => events.OnContentLoad("onContentLoad"))
        /// %&gt;
        /// </code>
        /// </example>
        public SplitterClientEventsBuilder OnContentLoad(string onContentLoadHandlerName)
        {
            Guard.IsNotNullOrEmpty(onContentLoadHandlerName, "onContentLoadHandlerName");

            clientEvents.OnContentLoad.HandlerName = onContentLoadHandlerName;

            return this;
        }
    }
}
