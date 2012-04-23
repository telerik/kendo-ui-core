// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Fluent
{
    using System;
    using Infrastructure;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="Upload.ClientEvents"/>.
    /// </summary>
    public class UploadClientEventsBuilder : IHideObjectMembers
    {
        private readonly UploadClientEvents events;

        /// <summary>
        /// Initializes a new instance of the <see cref="UploadClientEventsBuilder" /> class.
        /// </summary>
        /// <param name="clientEvents">The client events.</param>
        public UploadClientEventsBuilder(UploadClientEvents clientEvents)
        {
            events = clientEvents;
        }

        /// <summary>
        /// Defines the inline handler of the OnLoad client-side event
        /// </summary>
        /// <param name="codeBlock">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Telerik().Upload()
        ///            .Name("Upload")
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
        public UploadClientEventsBuilder OnLoad(Action codeBlock)
        {
            return CodeBlock(events.OnLoad, codeBlock);
        }

        /// <summary>
        /// Defines the inline handler of the OnLoad client-side event
        /// </summary>
        /// <param name="inlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Telerik().Upload()
        ///            .Name("Upload")
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
        public UploadClientEventsBuilder OnLoad(Func<object, object> inlineCodeBlock)
        {
            return InlineCodeBlock(events.OnLoad, inlineCodeBlock);
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the OnLoad client-side event.
        /// </summary>
        /// <param name="onLoadHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Telerik().Upload()
        ///             .Name("Upload")
        ///             .ClientEvents(events => events.OnLoad("onLoad"))
        /// %&gt;
        /// </code>
        /// </example>
        public UploadClientEventsBuilder OnLoad(string onLoadHandlerName)
        {
            return HandlerName(events.OnLoad, onLoadHandlerName);
        }

        /// <summary>
        /// Defines the inline handler of the OnSelect client-side event
        /// </summary>
        /// <param name="codeBlock">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Telerik().Upload()
        ///            .Name("Upload")
        ///            .ClientEvents(events => events.OnSelect(() =>
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
        public UploadClientEventsBuilder OnSelect(Action codeBlock)
        {
            return CodeBlock(events.OnSelect, codeBlock);
        }

        /// <summary>
        /// Defines the inline handler of the OnSelect client-side event
        /// </summary>
        /// <param name="inlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Telerik().Upload()
        ///            .Name("Upload")
        ///            .ClientEvents(events => events.OnSelect(
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
        public UploadClientEventsBuilder OnSelect(Func<object, object> inlineCodeBlock)
        {
            return InlineCodeBlock(events.OnSelect, inlineCodeBlock);
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the OnSelect client-side event.
        /// </summary>
        /// <param name="onSelectHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Telerik().Upload()
        ///             .Name("Upload")
        ///             .ClientEvents(events => events.OnSelect("onSelect"))
        /// %&gt;
        /// </code>
        /// </example>
        public UploadClientEventsBuilder OnSelect(string onSelectHandlerName)
        {
            return HandlerName(events.OnSelect, onSelectHandlerName);
        }

        /// <summary>
        /// Defines the inline handler of the OnUpload client-side event
        /// </summary>
        /// <param name="codeBlock">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Telerik().Upload()
        ///            .Name("Upload")
        ///            .ClientEvents(events => events.OnUpload(() =>
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
        public UploadClientEventsBuilder OnUpload(Action codeBlock)
        {
            return CodeBlock(events.OnUpload, codeBlock);
        }

        /// <summary>
        /// Defines the inline handler of the OnUpload client-side event
        /// </summary>
        /// <param name="inlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Telerik().Upload()
        ///            .Name("Upload")
        ///            .ClientEvents(events => events.OnUpload(
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
        public UploadClientEventsBuilder OnUpload(Func<object, object> inlineCodeBlock)
        {
            return InlineCodeBlock(events.OnUpload, inlineCodeBlock);
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the OnUpload client-side event.
        /// </summary>
        /// <param name="onUploadHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Telerik().Upload()
        ///             .Name("Upload")
        ///             .ClientEvents(events => events.OnUpload("onUpload"))
        /// %&gt;
        /// </code>
        /// </example>
        public UploadClientEventsBuilder OnUpload(string onUploadHandlerName)
        {
            return HandlerName(events.OnUpload, onUploadHandlerName);
        }

        /// <summary>
        /// Defines the inline handler of the OnSuccess client-side event
        /// </summary>
        /// <param name="codeBlock">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Telerik().Upload()
        ///            .Name("Upload")
        ///            .ClientEvents(events => events.OnSuccess(() =>
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
        public UploadClientEventsBuilder OnSuccess(Action codeBlock)
        {
            return CodeBlock(events.OnSuccess, codeBlock);
        }

        /// <summary>
        /// Defines the inline handler of the OnSuccess client-side event
        /// </summary>
        /// <param name="inlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Telerik().Upload()
        ///            .Name("Upload")
        ///            .ClientEvents(events => events.OnSuccess(
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
        public UploadClientEventsBuilder OnSuccess(Func<object, object> inlineCodeBlock)
        {
            return InlineCodeBlock(events.OnSuccess, inlineCodeBlock);
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the OnSuccess client-side event.
        /// </summary>
        /// <param name="onSuccessHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Telerik().Upload()
        ///             .Name("Upload")
        ///             .ClientEvents(events => events.OnSuccess("onSuccess"))
        /// %&gt;
        /// </code>
        /// </example>
        public UploadClientEventsBuilder OnSuccess(string onSuccessHandlerName)
        {
            return HandlerName(events.OnSuccess, onSuccessHandlerName);
        }

        /// <summary>
        /// Defines the inline handler of the OnError client-side event
        /// </summary>
        /// <param name="codeBlock">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Telerik().Upload()
        ///            .Name("Upload")
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
        public UploadClientEventsBuilder OnError(Action codeBlock)
        {
            return CodeBlock(events.OnError, codeBlock);
        }

        /// <summary>
        /// Defines the inline handler of the OnError client-side event
        /// </summary>
        /// <param name="inlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Telerik().Upload()
        ///            .Name("Upload")
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
        public UploadClientEventsBuilder OnError(Func<object, object> inlineCodeBlock)
        {
            return InlineCodeBlock(events.OnError, inlineCodeBlock);
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the OnError client-side event.
        /// </summary>
        /// <param name="onErrorHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Telerik().Upload()
        ///             .Name("Upload")
        ///             .ClientEvents(events => events.OnError("onError"))
        /// %&gt;
        /// </code>
        /// </example>
        public UploadClientEventsBuilder OnError(string onErrorHandlerName)
        {
            return HandlerName(events.OnError, onErrorHandlerName);
        }

        /// <summary>
        /// Defines the inline handler of the OnComplete client-side event
        /// </summary>
        /// <param name="codeBlock">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Telerik().Upload()
        ///            .Name("Upload")
        ///            .ClientEvents(events => events.OnComplete(() =>
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
        public UploadClientEventsBuilder OnComplete(Action codeBlock)
        {
            return CodeBlock(events.OnComplete, codeBlock);
        }

        /// <summary>
        /// Defines the inline handler of the OnComplete client-side event
        /// </summary>
        /// <param name="inlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Telerik().Upload()
        ///            .Name("Upload")
        ///            .ClientEvents(events => events.OnComplete(
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
        public UploadClientEventsBuilder OnComplete(Func<object, object> inlineCodeBlock)
        {
            return InlineCodeBlock(events.OnComplete, inlineCodeBlock);
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the OnComplete client-side event.
        /// </summary>
        /// <param name="onCompleteHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Telerik().Upload()
        ///             .Name("Upload")
        ///             .ClientEvents(events => events.OnComplete("onComplete"))
        /// %&gt;
        /// </code>
        /// </example>
        public UploadClientEventsBuilder OnComplete(string onCompleteHandlerName)
        {
            return HandlerName(events.OnComplete, onCompleteHandlerName);
        }

        /// <summary>
        /// Defines the inline handler of the OnCancel client-side event
        /// </summary>
        /// <param name="codeBlock">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Telerik().Upload()
        ///            .Name("Upload")
        ///            .ClientEvents(events => events.OnCancel(() =>
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
        public UploadClientEventsBuilder OnCancel(Action codeBlock)
        {
            return CodeBlock(events.OnCancel, codeBlock);
        }

        /// <summary>
        /// Defines the inline handler of the OnCancel client-side event
        /// </summary>
        /// <param name="inlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Telerik().Upload()
        ///            .Name("Upload")
        ///            .ClientEvents(events => events.OnCancel(
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
        public UploadClientEventsBuilder OnCancel(Func<object, object> inlineCodeBlock)
        {
            return InlineCodeBlock(events.OnCancel, inlineCodeBlock);
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the OnCancel client-side event.
        /// </summary>
        /// <param name="onCancelHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Telerik().Upload()
        ///             .Name("Upload")
        ///             .ClientEvents(events => events.OnCancel("onCancel"))
        /// %&gt;
        /// </code>
        /// </example>
        public UploadClientEventsBuilder OnCancel(string onCancelHandlerName)
        {
            return HandlerName(events.OnCancel, onCancelHandlerName);
        }

        /// <summary>
        /// Defines the inline handler of the OnRemove client-side event
        /// </summary>
        /// <param name="codeBlock">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Telerik().Upload()
        ///            .Name("Upload")
        ///            .ClientEvents(events => events.OnRemove(() =>
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
        public UploadClientEventsBuilder OnRemove(Action codeBlock)
        {
            return CodeBlock(events.OnRemove, codeBlock);
        }

        /// <summary>
        /// Defines the inline handler of the OnRemove client-side event
        /// </summary>
        /// <param name="inlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Telerik().Upload()
        ///            .Name("Upload")
        ///            .ClientEvents(events => events.OnRemove(
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
        public UploadClientEventsBuilder OnRemove(Func<object, object> inlineCodeBlock)
        {
            return InlineCodeBlock(events.OnRemove, inlineCodeBlock);
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the OnRemove client-side event.
        /// </summary>
        /// <param name="onRemoveHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Telerik().Upload()
        ///             .Name("Upload")
        ///             .ClientEvents(events => events.OnRemove("onRemove"))
        /// %&gt;
        /// </code>
        /// </example>
        public UploadClientEventsBuilder OnRemove(string onRemoveHandlerName)
        {
            return HandlerName(events.OnRemove, onRemoveHandlerName);
        }

        private UploadClientEventsBuilder CodeBlock(ClientEvent e, Action codeBlock)
        {
            Guard.IsNotNull(codeBlock, "codeBlock");

            e.CodeBlock = codeBlock;

            return this;
        }

        private UploadClientEventsBuilder InlineCodeBlock(ClientEvent e, Func<object, object> inlineCodeBlock)
        {
            Guard.IsNotNull(inlineCodeBlock, "inlineCodeBlock");

            e.InlineCodeBlock = inlineCodeBlock;

            return this;
        }

        private UploadClientEventsBuilder HandlerName(ClientEvent e, string handler)
        {
            Guard.IsNotNullOrEmpty(handler, "handler");

            e.HandlerName = handler;

            return this;
        }
    }
}
