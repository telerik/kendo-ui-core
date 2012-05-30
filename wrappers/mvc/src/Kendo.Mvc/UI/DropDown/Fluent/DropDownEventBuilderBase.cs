namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;

    public class DropDownEventBuilderBase : EventBuilder
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="DropDownEventBuilderBase"/> class.
        /// </summary>
        /// <param name="Events">The client events.</param>
        /// <param name="viewContext">The view context.</param>
        public DropDownEventBuilderBase(IDictionary<string, object> events) : base(events)
        {
        }

        
        /// <summary>
        /// Defines the inline handler of the Select client-side event
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().DropDownList()
        ///            .Name("DropDownList")
        ///            .Events(events => events.Select(
        ///                 @&lt;text&gt;
        ///                 function(e) {
        ///                     //event handling code
        ///                 }
        ///                 &lt;/text&gt;
        ///            ))
        /// %&gt;
        /// </code>
        /// </example>
        public DropDownEventBuilderBase Select(Func<object, object> handler)
        {
            Handler("select", handler);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Select client-side event.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().DropDownList()
        ///             .Name("DropDownList")
        ///             .Events(events => events.Select("select"))
        /// %&gt;
        /// </code>
        /// </example>
        public DropDownEventBuilderBase Select(string handler)
        {
            Handler("select", handler);

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the Change client-side event
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().DropDownList()
        ///            .Name("DropDownList")
        ///            .Events(events => events.Change(
        ///                 @&lt;text&gt;
        ///                 function(e) {
        ///                     //event handling code
        ///                 }
        ///                 &lt;/text&gt;
        ///            ))
        /// %&gt;
        /// </code>
        /// </example>
        public DropDownEventBuilderBase Change(Func<object, object> handler)
        {
            Handler("change", handler);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Change client-side event.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().DropDownList()
        ///             .Name("DropDownList")
        ///             .Events(events => events.Change("onChange"))
        /// %&gt;
        /// </code>
        /// </example>
        public DropDownEventBuilderBase Change(string handler)
        {
            Handler("change", handler);
            
            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Open client-side event.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().DropDownList()
        ///             .Name("DropDownList")
        ///             .Events(events => events.Open("Open"))
        /// %&gt;
        /// </code>
        /// </example>
        public DropDownEventBuilderBase Open(string handler)
        {
            Handler("open", handler);
            
            return this;
        }

        /// <summary>
        /// Defines the inline handler of the Open client-side event
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().DropDownList()
        ///            .Name("DropDownList")
        ///            .Events(events => events.Open(
        ///                 @&lt;text&gt;
        ///                 function(e) {
        ///                     //event handling code
        ///                 }
        ///                 &lt;/text&gt;
        ///            ))
        /// %&gt;
        /// </code>
        /// </example>
        public DropDownEventBuilderBase Open(Func<object, object> handler)
        {
            Handler("open", handler);
            
            return this;
        }

        /// <summary>
        /// Defines the inline handler of the Close client-side event
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().DropDownList()
        ///            .Name("DropDownList")
        ///            .Events(events => events.Close(
        ///                 @&lt;text&gt;
        ///                 function(e) {
        ///                     //event handling code
        ///                 }
        ///                 &lt;/text&gt;
        ///            ))
        /// %&gt;
        /// </code>
        /// </example>
        public DropDownEventBuilderBase Close(Func<object, object> handler)
        {
            Handler("close", handler);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Close client-side event.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().DropDownList()
        ///             .Name("DropDownList")
        ///             .Events(events => events.Close("close"))
        /// %&gt;
        /// </code>
        /// </example>
        public DropDownEventBuilderBase Close(string handler)
        {
            Handler("close", handler);
            
            return this;
        }
    }
}