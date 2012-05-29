namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;

    /// <summary>Defines the fluent interface for configuring the <see cref="RangeSlider.ClientEvents"/>.</summary>
    public class RangeSliderEventBuilder : EventBuilder
    {
        public RangeSliderEventBuilder(IDictionary<string, object> events)
            : base(events)
        {
        }

        /// <summary>
        /// Defines the inline handler of the OnChange client-side event
        /// </summary>
        /// <param name="handlerName">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().RangeSlider()
        ///            .Name("RangeSlider")
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
        public RangeSliderEventBuilder Change(Func<object, object> handlerName)
        {
            Handler("slide", handlerName);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Kendo client-side event.
        /// </summary>
        /// <param name="handlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().RangeSlider()
        ///             .Name("RangeSlider")
        ///             .ClientEvents(events => events.Change("change"))
        /// %&gt;
        /// </code>
        /// </example>
        public RangeSliderEventBuilder Change(string handlerName)
        {
            Handler("slide", handlerName);

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnSlide client-side event.
        /// </summary>
        /// <param name="handlerName">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().RangeSlider()
        ///            .Name("RangeSlider")
        ///            .ClientEvents(events => events.Slide(() =>
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
        public RangeSliderEventBuilder Slide(Func<object, object> handlerName)
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
        ///  &lt;%= Html.Kendo().RangeSlider()
        ///             .Name("RangeSlider")
        ///             .ClientEvents(events => events.Slide("slide"))
        /// %&gt;
        /// </code>
        /// </example>
        public RangeSliderEventBuilder Slide(string handlerName)
        {
            Handler("slide", handlerName);

            return this;
        }
    }
}