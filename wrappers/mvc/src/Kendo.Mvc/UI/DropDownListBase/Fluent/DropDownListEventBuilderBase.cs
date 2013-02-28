namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;

    public class DropDownListEventBuilderBase<TDropDownEventBuilder> : EventBuilder
        where TDropDownEventBuilder : DropDownListEventBuilderBase<TDropDownEventBuilder>
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="DropDownListEventBuilderBase"/> class.
        /// </summary>
        /// <param name="Events">The client events.</param>
        public DropDownListEventBuilderBase(IDictionary<string, object> events) : base(events)
        {
        }


        /// <summary>
        /// Defines the inline handler of the Select client-side event
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  @(Html.Kendo().DropDownList()
        ///            .Name("DropDownList")
        ///            .Events(events => events.Select(
        ///                 @&lt;text&gt;
        ///                 function(e) {
        ///                     //event handling code
        ///                 }
        ///                 &lt;/text&gt;
        ///            ))
        /// )
        /// </code>
        /// </example>
        public TDropDownEventBuilder Select(Func<object, object> handler)
        {
            Handler("select", handler);

            return this as TDropDownEventBuilder;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Select client-side event.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  @(Html.Kendo().DropDownList()
        ///             .Name("DropDownList")
        ///             .Events(events => events.Select("select"))
        /// )
        /// </code>
        /// </example>
        public TDropDownEventBuilder Select(string handler)
        {
            Handler("select", handler);

            return this as TDropDownEventBuilder;
        }

        /// <summary>
        /// Defines the inline handler of the Change client-side event
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  @(Html.Kendo().DropDownList()
        ///            .Name("DropDownList")
        ///            .Events(events => events.Change(
        ///                 @&lt;text&gt;
        ///                 function(e) {
        ///                     //event handling code
        ///                 }
        ///                 &lt;/text&gt;
        ///            ))
        /// )
        /// </code>
        /// </example>
        public TDropDownEventBuilder Change(Func<object, object> handler)
        {
            Handler("change", handler);

            return this as TDropDownEventBuilder;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Change client-side event.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  @(Html.Kendo().DropDownList()
        ///             .Name("DropDownList")
        ///             .Events(events => events.Change("change"))
        /// )
        /// </code>
        /// </example>
        public TDropDownEventBuilder Change(string handler)
        {
            Handler("change", handler);

            return this as TDropDownEventBuilder;
        }

        /// <summary>
        /// Defines the inline handler of the DataBound client-side event
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  @(Html.Kendo().DropDownList()
        ///            .Name("DropDownList")
        ///            .Events(events => events.DataBound(
        ///                 @&lt;text&gt;
        ///                 function(e) {
        ///                     //event handling code
        ///                 }
        ///                 &lt;/text&gt;
        ///            ))
        /// )
        /// </code>
        /// </example>
        public TDropDownEventBuilder DataBound(Func<object, object> handler)
        {
            Handler("dataBound", handler);

            return this as TDropDownEventBuilder;
        }

        /// <summary>
        /// Defines the name of the JavaScript function that will handle the the DataBound client-side event.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().DropDownList()
        ///             .Name("DropDownList")
        ///             .Events(events => events.DataBound("dataBound"))
        /// %&gt;
        /// </code>
        /// </example>
        public TDropDownEventBuilder DataBound(string handler)
        {
            Handler("dataBound", handler);

            return this as TDropDownEventBuilder;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Open client-side event.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  @(Html.Kendo().DropDownList()
        ///             .Name("DropDownList")
        ///             .Events(events => events.Open("open"))
        /// )
        /// </code>
        /// </example>
        public TDropDownEventBuilder Open(string handler)
        {
            Handler("open", handler);

            return this as TDropDownEventBuilder;
        }

        /// <summary>
        /// Defines the inline handler of the Open client-side event
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  @(Html.Kendo().DropDownList()
        ///            .Name("DropDownList")
        ///            .Events(events => events.Open(
        ///                 @&lt;text&gt;
        ///                 function(e) {
        ///                     //event handling code
        ///                 }
        ///                 &lt;/text&gt;
        ///            ))
        /// )
        /// </code>
        /// </example>
        public TDropDownEventBuilder Open(Func<object, object> handler)
        {
            Handler("open", handler);

            return this as TDropDownEventBuilder;
        }

        /// <summary>
        /// Defines the inline handler of the Close client-side event
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  @(Html.Kendo().DropDownList()
        ///            .Name("DropDownList")
        ///            .Events(events => events.Close(
        ///                 @&lt;text&gt;
        ///                 function(e) {
        ///                     //event handling code
        ///                 }
        ///                 &lt;/text&gt;
        ///            ))
        /// )
        /// </code>
        /// </example>
        public TDropDownEventBuilder Close(Func<object, object> handler)
        {
            Handler("close", handler);

            return this as TDropDownEventBuilder;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Close client-side event.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  @(Html.Kendo().DropDownList()
        ///             .Name("DropDownList")
        ///             .Events(events => events.Close("close"))
        /// )
        /// </code>
        /// </example>
        public TDropDownEventBuilder Close(string handler)
        {
            Handler("close", handler);

            return this as TDropDownEventBuilder;
        }
    }
}
