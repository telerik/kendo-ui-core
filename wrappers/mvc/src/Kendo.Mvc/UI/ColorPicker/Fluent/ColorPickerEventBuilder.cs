namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent interface for configuring ColorPicker client events.
    /// </summary>
    public class ColorPickerEventBuilder : EventBuilder
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ColorPickerEventBuilder"/> class.
        /// </summary>
        /// <param name="events">The events bag.</param>
        public ColorPickerEventBuilder(IDictionary<string, object> events)
            : base(events)
        {
        }

        /// <summary>
        /// Defines the inline handler of the Change client-side event
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  @(Html.Kendo().ColorPicker()
        ///            .Name("ColorPicker")
        ///            .Events(events => events.Change(
        ///                 @&lt;text&gt;
        ///                 function(e) {
        ///                     // event handling code
        ///                 }
        ///                 &lt;/text&gt;
        ///            ))
        ///  )
        /// </code>
        /// </example>
        public ColorPickerEventBuilder Change(Func<object, object> handler)
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
        /// @(Html.Kendo().ColorPicker()
        ///             .Name("ColorPicker")
        ///             .Events(events => events.Change("change"))
        /// )
        /// </code>
        /// </example>
        public ColorPickerEventBuilder Change(string handler)
        {
            Handler("change", handler);

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the Select client-side event
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  @(Html.Kendo().ColorPicker()
        ///            .Name("ColorPicker")
        ///            .Events(events => events.Select(
        ///                 @&lt;text&gt;
        ///                 function(e) {
        ///                     // event handling code
        ///                 }
        ///                 &lt;/text&gt;
        ///            ))
        ///  )
        /// </code>
        /// </example>
        public ColorPickerEventBuilder Select(Func<object, object> handler)
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
        /// @(Html.Kendo().ColorPicker()
        ///             .Name("ColorPicker")
        ///             .Events(events => events.Select("change"))
        /// )
        /// </code>
        /// </example>
        public ColorPickerEventBuilder Select(string handler)
        {
            Handler("select", handler);

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the Open client-side event
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  @(Html.Kendo().ColorPicker()
        ///            .Name("ColorPicker")
        ///            .Events(events => events.Open(
        ///                 @&lt;text&gt;
        ///                 function(e) {
        ///                     // event handling code
        ///                 }
        ///                 &lt;/text&gt;
        ///            ))
        ///  )
        /// </code>
        /// </example>
        public ColorPickerEventBuilder Open(Func<object, object> handler)
        {
            Handler("open", handler);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Open client-side event.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        /// @(Html.Kendo().ColorPicker()
        ///             .Name("ColorPicker")
        ///             .Events(events => events.Open("open"))
        /// )
        /// </code>
        /// </example>
        public ColorPickerEventBuilder Open(string handler)
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
        ///  @(Html.Kendo().ColorPicker()
        ///            .Name("ColorPicker")
        ///            .Events(events => events.Close(
        ///                 @&lt;text&gt;
        ///                 function(e) {
        ///                     // event handling code
        ///                 }
        ///                 &lt;/text&gt;
        ///            ))
        ///  )
        /// </code>
        /// </example>
        public ColorPickerEventBuilder Close(Func<object, object> handler)
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
        /// @(Html.Kendo().ColorPicker()
        ///             .Name("ColorPicker")
        ///             .Events(events => events.Close("close"))
        /// )
        /// </code>
        /// </example>
        public ColorPickerEventBuilder Close(string handler)
        {
            Handler("close", handler);

            return this;
        }
    }
}
