namespace KendoUI.Mvc.UI
{
    using System;
    using System.Web.Mvc;

    using Infrastructure;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="TextBoxBase.ClientEvents"/>.
    /// </summary>
    public class TextBoxBaseClientEventsBuilder : IHideObjectMembers
    {
        private readonly TextBoxBaseClientEvents clientEvents;
        private readonly ViewContext viewContext;

        public TextBoxBaseClientEventsBuilder(TextBoxBaseClientEvents clientEvents, ViewContext viewContext)
        {

            this.clientEvents = clientEvents;
            this.viewContext = viewContext;
        }

        /// <summary>
        /// Defines the inline handler of the OnChange client-side event
        /// </summary>
        /// <param name="onChangeCodeBlock">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().IntegerTextBox()
        ///            .Name("IntegerTextBox")
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
        public TextBoxBaseClientEventsBuilder OnChange(Action onChangeCodeBlock)
        {

            clientEvents.OnChange.CodeBlock = onChangeCodeBlock;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnChange client-side event
        /// </summary>
        /// <param name="onChangeInlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().IntegerTextBox()
        ///            .Name("IntegerTextBox")
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
        public TextBoxBaseClientEventsBuilder OnChange(Func<object, object> onChangeInlineCodeBlock)
        {

            clientEvents.OnChange.InlineCodeBlock = onChangeInlineCodeBlock;

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the OnChange client-side event.
        /// </summary>
        /// <param name="onSelectHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().IntegerTextBox()
        ///             .Name("IntegerTextBox")
        ///             .ClientEvents(events => events.OnChange("onChange"))
        /// %&gt;
        /// </code>
        /// </example>
        public TextBoxBaseClientEventsBuilder OnChange(string onChangeHandlerName)
        {

            clientEvents.OnChange.HandlerName = onChangeHandlerName;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnLoad client-side event
        /// </summary>
        /// <param name="onLoadCodeBlock">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().IntegerTextBox()
        ///            .Name("IntegerTextBox")
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
        public TextBoxBaseClientEventsBuilder OnLoad(Action onLoadCodeBlock)
        {

            clientEvents.OnLoad.CodeBlock = onLoadCodeBlock;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnLoad client-side event
        /// </summary>
        /// <param name="onLoadInlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().IntegerTextBox()
        ///            .Name("IntegerTextBox")
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
        public TextBoxBaseClientEventsBuilder OnLoad(Func<object, object> onLoadInlineCodeBlock)
        {

            clientEvents.OnLoad.InlineCodeBlock = onLoadInlineCodeBlock;

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the OnLoad client-side event.
        /// </summary>
        /// <param name="onLoadHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().IntegerTextBox()
        ///             .Name("IntegerTextBox")
        ///             .ClientEvents(events => events.OnLoad("onLoad"))
        /// %&gt;
        /// </code>
        /// </example>
        public TextBoxBaseClientEventsBuilder OnLoad(string onLoadHandlerName)
        {

            clientEvents.OnLoad.HandlerName = onLoadHandlerName;

            return this;
        }
    }
}
