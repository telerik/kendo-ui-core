namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="Upload.Events"/>.
    /// </summary>
    public class UploadEventBuilder : EventBuilder
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="UploadEventBuilder" /> class.
        /// </summary>
        /// <param name="clientEvents">The client events.</param>
        public UploadEventBuilder(IDictionary<string, object> clientEvents) : base(clientEvents)
        {
        }

        /// <summary>
        /// Defines the inline handler of the Select client-side event
        /// </summary>
        /// <param name="inlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Telerik().Upload()
        ///            .Name("Upload")
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
        public UploadEventBuilder Select(Func<object, object> inlineCodeBlock)
        {
            Handler("select", inlineCodeBlock);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Select client-side event.
        /// </summary>
        /// <param name="onSelectHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Telerik().Upload()
        ///             .Name("Upload")
        ///             .Events(events => events.Select("onSelect"))
        /// %&gt;
        /// </code>
        /// </example>
        public UploadEventBuilder Select(string onSelectHandlerName)
        {
            Handler("select", onSelectHandlerName);

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the Upload client-side event
        /// </summary>
        /// <param name="inlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Telerik().Upload()
        ///            .Name("Upload")
        ///            .Events(events => events.Upload(
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
        public UploadEventBuilder Upload(Func<object, object> inlineCodeBlock)
        {
            Handler("upload", inlineCodeBlock);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Upload client-side event.
        /// </summary>
        /// <param name="onUploadHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Telerik().Upload()
        ///             .Name("Upload")
        ///             .Events(events => events.Upload("onUpload"))
        /// %&gt;
        /// </code>
        /// </example>
        public UploadEventBuilder Upload(string onUploadHandlerName)
        {
            Handler("upload", onUploadHandlerName);

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the Success client-side event
        /// </summary>
        /// <param name="inlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Telerik().Upload()
        ///            .Name("Upload")
        ///            .Events(events => events.Success(
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
        public UploadEventBuilder Success(Func<object, object> inlineCodeBlock)
        {
            Handler("success", inlineCodeBlock);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Success client-side event.
        /// </summary>
        /// <param name="onSuccessHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Telerik().Upload()
        ///             .Name("Upload")
        ///             .Events(events => events.Success("onSuccess"))
        /// %&gt;
        /// </code>
        /// </example>
        public UploadEventBuilder Success(string onSuccessHandlerName)
        {
            Handler("success", onSuccessHandlerName);

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the Error client-side event
        /// </summary>
        /// <param name="inlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Telerik().Upload()
        ///            .Name("Upload")
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
        public UploadEventBuilder Error(Func<object, object> inlineCodeBlock)
        {
            Handler("error", inlineCodeBlock);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Error client-side event.
        /// </summary>
        /// <param name="onErrorHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Telerik().Upload()
        ///             .Name("Upload")
        ///             .Events(events => events.Error("onError"))
        /// %&gt;
        /// </code>
        /// </example>
        public UploadEventBuilder Error(string onErrorHandlerName)
        {
            Handler("error", onErrorHandlerName);

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the Complete client-side event
        /// </summary>
        /// <param name="inlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Telerik().Upload()
        ///            .Name("Upload")
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
        public UploadEventBuilder Complete(Func<object, object> inlineCodeBlock)
        {
            Handler("complete", inlineCodeBlock);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Complete client-side event.
        /// </summary>
        /// <param name="onCompleteHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Telerik().Upload()
        ///             .Name("Upload")
        ///             .Events(events => events.Complete("onComplete"))
        /// %&gt;
        /// </code>
        /// </example>
        public UploadEventBuilder Complete(string onCompleteHandlerName)
        {
            Handler("complete", onCompleteHandlerName);

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the Cancel client-side event
        /// </summary>
        /// <param name="inlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Telerik().Upload()
        ///            .Name("Upload")
        ///            .Events(events => events.Cancel(
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
        public UploadEventBuilder Cancel(Func<object, object> inlineCodeBlock)
        {
            Handler("cancel", inlineCodeBlock);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Cancel client-side event.
        /// </summary>
        /// <param name="onCancelHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Telerik().Upload()
        ///             .Name("Upload")
        ///             .Events(events => events.Cancel("onCancel"))
        /// %&gt;
        /// </code>
        /// </example>
        public UploadEventBuilder Cancel(string onCancelHandlerName)
        {
            Handler("cancel", onCancelHandlerName);

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the Remove client-side event
        /// </summary>
        /// <param name="inlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Telerik().Upload()
        ///            .Name("Upload")
        ///            .Events(events => events.Remove(
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
        public UploadEventBuilder Remove(Func<object, object> inlineCodeBlock)
        {
            Handler("remove", inlineCodeBlock);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Remove client-side event.
        /// </summary>
        /// <param name="onRemoveHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Telerik().Upload()
        ///             .Name("Upload")
        ///             .Events(events => events.Remove("onRemove"))
        /// %&gt;
        /// </code>
        /// </example>
        public UploadEventBuilder Remove(string onRemoveHandlerName)
        {
            Handler("remove", onRemoveHandlerName);

            return this;
        }
    }
}
