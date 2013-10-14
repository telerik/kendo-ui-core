namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;

    public class ProgressBarEventBuilder : EventBuilder
    {
        /// <summary>
        /// Initializes a new instance of teh <see cref="ProgressBarEventBuilder"/> class
        /// </summary>
        /// <param name="clientEvents">The client events.</param>
        public ProgressBarEventBuilder(IDictionary<string, object> clientEvents)
            : base(clientEvents)
        { 
        }

        /// <summary>
        /// Defines the inline handler of the Start client-side event
        /// </summary>
        /// <param name="inlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().ProgressBar()
        ///            .Name(&quot;progressBar&quot;)
        ///            .Events(events => events.Start(
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
        public ProgressBarEventBuilder Start(Func<object, object> inlineCodeBlock)
        {
            Handler("start", inlineCodeBlock);

            return this;
        }

        /// <summary>
        /// Defines the name of the JavaScript function that will handle the the Start client-side event.
        /// </summary>
        /// <param name="onStartHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().ProgressBar()
        ///             .Name(&quot;progressBar&quot;)
        ///             .Events(events => events.Start("onStart"))
        /// %&gt;
        /// </code>
        /// </example>
        public ProgressBarEventBuilder Start(string onStartHandlerName)
        {
            Handler("start", onStartHandlerName);

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the Change client-side event
        /// </summary>
        /// <param name="inlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().ProgressBar()
        ///            .Name(&quot;progressBar&quot;)
        ///            .Events(events => events.Change(
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
        public ProgressBarEventBuilder Change(Func<object, object> inlineCodeBlock)
        {
            Handler("change", inlineCodeBlock);

            return this;
        }

        /// <summary>
        /// Defines the name of the JavaScript function that will handle the the Change client-side event.
        /// </summary>
        /// <param name="onChangeHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().ProgressBar()
        ///             .Name(&quot;progressBar&quot;)
        ///             .Events(events => events.Change("onChange"))
        /// %&gt;
        /// </code>
        /// </example>
        public ProgressBarEventBuilder Change(string onChangeHandlerName)
        {
            Handler("change", onChangeHandlerName);

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the Complete client-side event
        /// </summary>
        /// <param name="inlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().ProgressBar()
        ///            .Name(&quot;progressBar&quot;)
        ///            .Events(events => events.Complete(
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
        public ProgressBarEventBuilder Complete(Func<object, object> inlineCodeBlock)
        {
            Handler("complete", inlineCodeBlock);

            return this;
        }

        /// <summary>
        /// Defines the name of the JavaScript function that will handle the the Complete client-side event.
        /// </summary>
        /// <param name="onCompleteHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().ProgressBar()
        ///             .Name(&quot;progressBar&quot;)
        ///             .Events(events => events.Complete("onComplete"))
        /// %&gt;
        /// </code>
        /// </example>
        public ProgressBarEventBuilder Complete(string onCompleteHandlerName)
        {
            Handler("complete", onCompleteHandlerName);

            return this;
        }
    }
}
