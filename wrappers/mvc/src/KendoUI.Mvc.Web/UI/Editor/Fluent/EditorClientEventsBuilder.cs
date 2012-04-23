// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Fluent
{
    using System;
    using Telerik.Web.Mvc.Infrastructure;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="Editor.ClientEvents"/>.
    /// </summary>
    public class EditorClientEventsBuilder : IHideObjectMembers
    {
        private EditorClientEvents events;

        /// <summary>
        /// Initializes a new instance of the <see cref="EditorClientEventsBuilder"/> class.
        /// </summary>
        /// <param name="clientEvents">The client events.</param>
        public EditorClientEventsBuilder(EditorClientEvents clientEvents)
        {
            this.events = clientEvents;
        }

        /// <summary>
        /// Defines the inline handler of the OnLoad client-side event
        /// </summary>
        /// <param name="onLoadAction">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().Editor()
        ///            .Name("Editor")
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
        public EditorClientEventsBuilder OnLoad(Action codeBlock)
        {
            return CodeBlock(events.OnLoad, codeBlock);
        }

        /// <summary>
        /// Defines the inline handler of the OnLoad client-side event
        /// </summary>
        /// <param name="inlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  @(Html.Telerik().Editor()
        ///            .Name("Editor")
        ///            .ClientEvents(events => events.OnLoad(
        ///                 @&lt;text&gt;
        ///                 function(e) {
        ///                     //event handling code
        ///                 }
        ///                 &lt;/text&gt;
        ///            )))
        /// </code>
        /// </example>
        public EditorClientEventsBuilder OnLoad(Func<object, object> inlineCodeBlock)
        {
            return InlineCodeBlock(events.OnLoad, inlineCodeBlock);
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the OnLoad client-side event.
        /// </summary>
        /// <param name="onLoadHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Editor()
        ///             .Name("Editor")
        ///             .ClientEvents(events => events.OnLoad("onLoad"))
        /// %&gt;
        /// </code>
        /// </example>
        public EditorClientEventsBuilder OnLoad(string onLoadHandlerName)
        {
            return HandlerName(events.OnLoad, onLoadHandlerName);
        }

        /// <summary>
        /// Defines the inline handler of the OnPaste client-side event
        /// </summary>
        /// <param name="onPasteAction">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().Editor()
        ///            .Name("Editor")
        ///            .ClientEvents(events => events.OnPaste(() =>
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
        public EditorClientEventsBuilder OnPaste(Action codeBlock)
        {
            return CodeBlock(events.OnPaste, codeBlock);
        }

        /// <summary>
        /// Defines the inline handler of the OnLoad client-side event
        /// </summary>
        /// <param name="inlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  @(Html.Telerik().Editor()
        ///        .Name("Editor")
        ///        .ClientEvents(events => events.OnPaste(
        ///                 @&lt;text&gt;
        ///                 function(e) {
        ///                     //event handling code
        ///                 }
        ///                 &lt;/text&gt;
        ///         ))
        /// )
        /// </code>
        /// </example>
        public EditorClientEventsBuilder OnPaste(Func<object, object> inlineCodeBlock)
        {
            return InlineCodeBlock(events.OnPaste, inlineCodeBlock);
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the OnPaste client-side event.
        /// </summary>
        /// <param name="onPasteHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Editor()
        ///             .Name("Editor")
        ///             .ClientEvents(events => events.OnPaste("onPaste"))
        /// %&gt;
        /// </code>
        /// </example>
        public EditorClientEventsBuilder OnPaste(string onPasteHandlerName)
        {
            return HandlerName(events.OnPaste, onPasteHandlerName);
        }

        /// <summary>
        /// Defines the inline handler of the OnExecute client-side event
        /// </summary>
        /// <param name="onLoadAction">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().Editor()
        ///            .Name("Editor")
        ///            .ClientEvents(events => events.OnExecute(() =>
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
        public EditorClientEventsBuilder OnExecute(Action codeBlock)
        {
            return CodeBlock(events.OnExecute, codeBlock);
        }

        /// <summary>
        /// Defines the inline handler of the OnExecute client-side event
        /// </summary>
        /// <param name="onLoadAction">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().Editor()
        ///            .Name("Editor")
        ///            .ClientEvents(events => events.OnExecute(
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
        public EditorClientEventsBuilder OnExecute(Func<object, object> inlineCodeBlock)
        {
            return InlineCodeBlock(events.OnExecute, inlineCodeBlock);
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the OnExecute client-side event.
        /// </summary>
        /// <param name="onLoadHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Editor()
        ///             .Name("Editor")
        ///             .ClientEvents(events => events.OnExecute("onExecute"))
        /// %&gt;
        /// </code>
        /// </example>
        public EditorClientEventsBuilder OnExecute(string onLoadHandlerName)
        {
            return HandlerName(events.OnExecute, onLoadHandlerName);
        }

        /// <summary>
        /// Defines the inline handler of the OnSelectionChange client-side event
        /// </summary>
        /// <param name="onLoadAction">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().Editor()
        ///            .Name("Editor")
        ///            .ClientEvents(events => events.OnSelectionChange(() =>
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
        public EditorClientEventsBuilder OnSelectionChange(Action codeBlock)
        {
            return CodeBlock(events.OnSelectionChange, codeBlock);
        }

        /// <summary>
        /// Defines the inline handler of the OnSelectionChange client-side event
        /// </summary>
        /// <param name="onLoadAction">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().Editor()
        ///            .Name("Editor")
        ///            .ClientEvents(events => events.OnSelectionChange(
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
        public EditorClientEventsBuilder OnSelectionChange(Func<object, object> inlineCodeBlock)
        {
            return InlineCodeBlock(events.OnSelectionChange, inlineCodeBlock);
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the OnSelectionChange client-side event.
        /// </summary>
        /// <param name="onLoadHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Editor()
        ///             .Name("Editor")
        ///             .ClientEvents(events => events.OnSelectionChange("onSelectionChange"))
        /// %&gt;
        /// </code>
        /// </example>
        public EditorClientEventsBuilder OnSelectionChange(string onLoadHandlerName)
        {
            return HandlerName(events.OnSelectionChange, onLoadHandlerName);
        }

        /// <summary>
        /// Defines the inline handler of the OnChange client-side event
        /// </summary>
        /// <param name="onLoadAction">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().Editor()
        ///            .Name("Editor")
        ///            .ClientEvents(events => events.OnChange(() =>
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
        public EditorClientEventsBuilder OnChange(Action codeBlock)
        {
            return CodeBlock(events.OnChange, codeBlock);
        }

        /// <summary>
        /// Defines the inline handler of the OnChange client-side event
        /// </summary>
        /// <param name="onLoadAction">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().Editor()
        ///            .Name("Editor")
        ///            .ClientEvents(events => events.OnChange(
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
        public EditorClientEventsBuilder OnChange(Func<object, object> inlineCodeBlock)
        {
            return InlineCodeBlock(events.OnChange, inlineCodeBlock);
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the OnChange client-side event.
        /// </summary>
        /// <param name="onLoadHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Editor()
        ///             .Name("Editor")
        ///             .ClientEvents(events => events.OnChange("onChange"))
        /// %&gt;
        /// </code>
        /// </example>
        public EditorClientEventsBuilder OnChange(string onLoadHandlerName)
        {
            return HandlerName(events.OnChange, onLoadHandlerName);
        }

        /// <summary>
        /// Defines the inline handler of the OnError client-side event
        /// </summary>
        /// <param name="codeBlock">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().Editor()
        ///            .Name("Editor")
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
        public EditorClientEventsBuilder OnError(Action codeBlock)
        {
            return CodeBlock(events.OnError, codeBlock);
        }

        /// <summary>
        /// Defines the inline handler of the OnError client-side event
        /// </summary>
        /// <param name="onLoadAction">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().Editor()
        ///            .Name("Editor")
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
        public EditorClientEventsBuilder OnError(Func<object, object> inlineCodeBlock)
        {
            return InlineCodeBlock(events.OnError, inlineCodeBlock);
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the OnError client-side event.
        /// </summary>
        /// <param name="onErrorHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Editor()
        ///             .Name("Editor")
        ///             .ClientEvents(events => events.OnError("onError"))
        /// %&gt;
        /// </code>
        /// </example>
        public EditorClientEventsBuilder OnError(string onErrorHandlerName)
        {
            return HandlerName(events.OnError, onErrorHandlerName);
        }

        private EditorClientEventsBuilder CodeBlock(ClientEvent e, Action codeBlock)
        {
            Guard.IsNotNull(codeBlock, "codeBlock");

            e.CodeBlock = codeBlock;

            return this;
        }

        private EditorClientEventsBuilder InlineCodeBlock(ClientEvent e, Func<object, object> inlineCodeBlock)
        {
            Guard.IsNotNull(inlineCodeBlock, "inlineCodeBlock");

            e.InlineCodeBlock = inlineCodeBlock;

            return this;
        }
        
        private EditorClientEventsBuilder HandlerName(ClientEvent e, string handler)
        {
            Guard.IsNotNullOrEmpty(handler, "handler");

            e.HandlerName = handler;
            
            return this;
        }
    }
}
