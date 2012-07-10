namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;

    /// <summary>Defines the fluent interface for configuring the Slider events.</summary>
    public class SliderEventBuilder : EventBuilder
    {
        public SliderEventBuilder(IDictionary<string, object> events)
            : base(events)
        {
        }

        /// <summary>
        /// Defines the inline handler of the Change client-side event
        /// </summary>
        /// <param name="handlerName">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().Slider()
        ///            .Name("Slider")
        ///            .Events(events => events.Change(() =>
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
        public SliderEventBuilder Change(Func<object, object> handlerName)
        {
            Handler("change", handlerName);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Change client-side event.
        /// </summary>
        /// <param name="handlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Slider()
        ///             .Name("Slider")
        ///             .Events(events => events.Change("change"))
        /// %&gt;
        /// </code>
        /// </example>
        public SliderEventBuilder Change(string handlerName)
        {
            Handler("change", handlerName);

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the Slide client-side event.
        /// </summary>
        /// <param name="handlerName">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().Slider()
        ///            .Name("Slider")
        ///            .Events(events => events.Slide(() =>
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
        public SliderEventBuilder Slide(Func<object, object> handlerName)
        {
            Handler("slide", handlerName);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Slide client-side event.
        /// </summary>
        /// <param name="handlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Slider()
        ///             .Name("Slider")
        ///             .Events(events => events.Slide("slide"))
        /// %&gt;
        /// </code>
        /// </example>
        public SliderEventBuilder Slide(string handlerName)
        {
            Handler("slide", handlerName);

            return this;
        }
    }
}