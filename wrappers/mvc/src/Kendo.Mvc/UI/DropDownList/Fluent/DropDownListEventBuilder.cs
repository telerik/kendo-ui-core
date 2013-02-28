namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;

    public class DropDownListEventBuilder : DropDownListEventBuilderBase<DropDownListEventBuilder>
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="DropDownListEventBuilder"/> class.
        /// </summary>
        /// <param name="Events">The client events.</param>
        public DropDownListEventBuilder(IDictionary<string, object> events)
            : base(events)
        {
        }


        /// <summary>
        /// Defines the inline handler of the Cascade client-side event
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  @(Html.Kendo().DropDownList()
        ///            .Name("DropDownList")
        ///            .Events(events => events.Cascade(
        ///                 @&lt;text&gt;
        ///                 function(e) {
        ///                     //event handling code
        ///                 }
        ///                 &lt;/text&gt;
        ///            ))
        /// )
        /// </code>
        /// </example>
        public DropDownListEventBuilder Cascade(Func<object, object> handler)
        {
            Handler("cascade", handler);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Cascade client-side event.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  @(Html.Kendo().DropDownList()
        ///             .Name("DropDownList")
        ///             .Events(events => events.Cascade("cascade"))
        /// )
        /// </code>
        /// </example>
        public DropDownListEventBuilder Cascade(string handler)
        {
            Handler("cascade", handler);

            return this;
        }
    }
}
