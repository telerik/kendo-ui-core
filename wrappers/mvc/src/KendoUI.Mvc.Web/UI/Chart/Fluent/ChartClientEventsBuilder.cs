

namespace KendoUI.Mvc.UI.Fluent
{
    using System;
    using Infrastructure;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="ChartClientEvents"/>.
    /// </summary>
    public class ChartClientEventsBuilder : IHideObjectMembers
    {
        private readonly ChartClientEvents events;

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartClientEventsBuilder" /> class.
        /// </summary>
        /// <param name="clientEvents">The client events.</param>
        public ChartClientEventsBuilder(ChartClientEvents clientEvents)
        {
            events = clientEvents;
        }

        /// <summary>
        /// Defines the inline handler of the OnLoad client-side event
        /// </summary>
        /// <param name="codeBlock">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Telerik().Chart()
        ///            .Name("Chart")
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
        public ChartClientEventsBuilder OnLoad(Action codeBlock)
        {
            return CodeBlock(events.OnLoad, codeBlock);
        }

        /// <summary>
        /// Defines the inline handler of the OnLoad client-side event
        /// </summary>
        /// <param name="inlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Telerik().Chart()
        ///            .Name("Chart")
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
        public ChartClientEventsBuilder OnLoad(Func<object, object> inlineCodeBlock)
        {
            return InlineCodeBlock(events.OnLoad, inlineCodeBlock);
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the OnLoad client-side event.
        /// </summary>
        /// <param name="onLoadHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Telerik().Chart()
        ///             .Name("Chart")
        ///             .ClientEvents(events => events.OnLoad("onLoad"))
        /// %&gt;
        /// </code>
        /// </example>
        public ChartClientEventsBuilder OnLoad(string onLoadHandlerName)
        {
            return HandlerName(events.OnLoad, onLoadHandlerName);
        }

        /// <summary>
        /// Defines the inline handler of the OnDataBound client-side event
        /// </summary>
        /// <param name="codeBlock">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Telerik().Chart()
        ///            .Name("Chart")
        ///            .ClientEvents(events => events.OnDataBound(() =>
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
        public ChartClientEventsBuilder OnDataBound(Action codeBlock)
        {
            return CodeBlock(events.OnDataBound, codeBlock);
        }

        /// <summary>
        /// Defines the inline handler of the OnDataBound client-side event
        /// </summary>
        /// <param name="inlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Telerik().Chart()
        ///            .Name("Chart")
        ///            .ClientEvents(events => events.OnDataBound(
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
        public ChartClientEventsBuilder OnDataBound(Func<object, object> inlineCodeBlock)
        {
            return InlineCodeBlock(events.OnDataBound, inlineCodeBlock);
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the OnDataBound client-side event.
        /// </summary>
        /// <param name="onDataBoundHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Telerik().Chart()
        ///             .Name("Chart")
        ///             .ClientEvents(events => events.OnDataBound("onDataBound"))
        /// %&gt;
        /// </code>
        /// </example>
        public ChartClientEventsBuilder OnDataBound(string onDataBoundHandlerName)
        {
            return HandlerName(events.OnDataBound, onDataBoundHandlerName);
        }

        /// <summary>
        /// Defines the inline handler of the OnDataBinding client-side event
        /// </summary>
        /// <param name="codeBlock">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Telerik().Chart()
        ///            .Name("Chart")
        ///            .ClientEvents(events => events.OnDataBinding(() =>
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
        public ChartClientEventsBuilder OnDataBinding(Action codeBlock)
        {
            return CodeBlock(events.OnDataBinding, codeBlock);
        }

        /// <summary>
        /// Defines the inline handler of the OnDataBinding client-side event
        /// </summary>
        /// <param name="inlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Telerik().Chart()
        ///            .Name("Chart")
        ///            .ClientEvents(events => events.OnDataBinding(
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
        public ChartClientEventsBuilder OnDataBinding(Func<object, object> inlineCodeBlock)
        {
            return InlineCodeBlock(events.OnDataBinding, inlineCodeBlock);
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the OnDataBinding client-side event.
        /// </summary>
        /// <param name="onDataBindingHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Telerik().Chart()
        ///             .Name("Chart")
        ///             .ClientEvents(events => events.OnDataBinding("onDataBinding"))
        /// %&gt;
        /// </code>
        /// </example>
        public ChartClientEventsBuilder OnDataBinding(string onDataBindingHandlerName)
        {
            return HandlerName(events.OnDataBinding, onDataBindingHandlerName);
        }

        /// <summary>
        /// Defines the inline handler of the OnSeriesClick client-side event
        /// </summary>
        /// <param name="codeBlock">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Telerik().Chart()
        ///            .Name("Chart")
        ///            .ClientEvents(events => events.OnSeriesClick(() =>
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
        public ChartClientEventsBuilder OnSeriesClick(Action codeBlock)
        {
            return CodeBlock(events.OnSeriesClick, codeBlock);
        }

        /// <summary>
        /// Defines the inline handler of the OnSeriesClick client-side event
        /// </summary>
        /// <param name="inlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Telerik().Chart()
        ///            .Name("Chart")
        ///            .ClientEvents(events => events.OnSeriesClick(
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
        public ChartClientEventsBuilder OnSeriesClick(Func<object, object> inlineCodeBlock)
        {
            return InlineCodeBlock(events.OnSeriesClick, inlineCodeBlock);
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the OnSeriesClick client-side event.
        /// </summary>
        /// <param name="onSeriesClickHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Telerik().Chart()
        ///             .Name("Chart")
        ///             .ClientEvents(events => events.OnSeriesClick("onSeriesClick"))
        /// %&gt;
        /// </code>
        /// </example>
        public ChartClientEventsBuilder OnSeriesClick(string onSeriesClickHandlerName)
        {
            return HandlerName(events.OnSeriesClick, onSeriesClickHandlerName);
        }

        /// <summary>
        /// Defines the inline handler of the OnError client-side event
        /// </summary>
        /// <param name="codeBlock">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Telerik().Chart()
        ///            .Name("Chart")
        ///            .ClientEvents(events => events.OnError(() =>
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
        public ChartClientEventsBuilder OnError(Action codeBlock)
        {
            return CodeBlock(events.OnError, codeBlock);
        }

        /// <summary>
        /// Defines the inline handler of the OnError client-side event
        /// </summary>
        /// <param name="inlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Telerik().Chart()
        ///            .Name("Chart")
        ///            .ClientEvents(events => events.OnError(
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
        public ChartClientEventsBuilder OnError(Func<object, object> inlineCodeBlock)
        {
            return InlineCodeBlock(events.OnError, inlineCodeBlock);
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the OnError client-side event.
        /// </summary>
        /// <param name="onSeriesClickHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Telerik().Chart()
        ///             .Name("Chart")
        ///             .ClientEvents(events => events.OnError("onSeriesClick"))
        /// %&gt;
        /// </code>
        /// </example>
        public ChartClientEventsBuilder OnError(string onErrorHandlerName)
        {
            return HandlerName(events.OnError, onErrorHandlerName);
        }

        private ChartClientEventsBuilder CodeBlock(ClientEvent e, Action codeBlock)
        {
            Guard.IsNotNull(codeBlock, "codeBlock");

            e.CodeBlock = codeBlock;

            return this;
        }

        private ChartClientEventsBuilder InlineCodeBlock(ClientEvent e, Func<object, object> inlineCodeBlock)
        {
            Guard.IsNotNull(inlineCodeBlock, "inlineCodeBlock");

            e.InlineCodeBlock = inlineCodeBlock;

            return this;
        }

        private ChartClientEventsBuilder HandlerName(ClientEvent e, string handler)
        {
            Guard.IsNotNullOrEmpty(handler, "handler");

            e.HandlerName = handler;

            return this;
        }
    }
}
