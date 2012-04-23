// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Fluent
{
    using System;
    using Infrastructure;

    /// <summary>Defines the fluent interface for configuring the <see cref="RangeSlider.ClientEvents"/>.</summary>
    public class RangeSliderClientEventsBuilder : IHideObjectMembers
    {
        private readonly SliderBaseClientEvents clientEvents;

        public RangeSliderClientEventsBuilder(SliderBaseClientEvents clientEvents)
        {
            Guard.IsNotNull(clientEvents, "clientEvents");

            this.clientEvents = clientEvents;
        }

        /// <summary>
        /// Defines the inline handler of the OnChange client-side event
        /// </summary>
        /// <param name="action">The action defining the inline handler.</param>
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
        public RangeSliderClientEventsBuilder OnChange(Action action)
        {
            Guard.IsNotNull(action, "action");

            clientEvents.OnChange.CodeBlock = action;

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the OnChange client-side event.
        /// </summary>
        /// <param name="handlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().RangeSlider()
        ///             .Name("RangeSlider")
        ///             .ClientEvents(events => events.OnChange("onChange"))
        /// %&gt;
        /// </code>
        /// </example>
        public RangeSliderClientEventsBuilder OnChange(string handlerName)
        {
            Guard.IsNotNullOrEmpty(handlerName, "handlerName");

            clientEvents.OnChange.HandlerName = handlerName;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnLoad client-side event
        /// </summary>
        /// <param name="action">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().RangeSlider()
        ///            .Name("RangeSlider")
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
        public RangeSliderClientEventsBuilder OnLoad(Action action)
        {
            Guard.IsNotNull(action, "action");

            clientEvents.OnLoad.CodeBlock = action;

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the OnLoad client-side event.
        /// </summary>
        /// <param name="handlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().RangeSlider()
        ///             .Name("RangeSlider")
        ///             .ClientEvents(events => events.OnLoad("onLoad"))
        /// %&gt;
        /// </code>
        /// </example>
        public RangeSliderClientEventsBuilder OnLoad(string handlerName)
        {
            Guard.IsNotNullOrEmpty(handlerName, "handlerName");

            clientEvents.OnLoad.HandlerName = handlerName;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnSlide client-side event.
        /// </summary>
        /// <param name="action">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().RangeSlider()
        ///            .Name("RangeSlider")
        ///            .ClientEvents(events => events.OnSlide(() =>
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
        public RangeSliderClientEventsBuilder OnSlide(Action action)
        {
            Guard.IsNotNull(action, "action");

            clientEvents.OnSlide.CodeBlock = action;

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the OnSlide client-side event.
        /// </summary>
        /// <param name="handlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().RangeSlider()
        ///             .Name("RangeSlider")
        ///             .ClientEvents(events => events.OnSlide("OnSlide"))
        /// %&gt;
        /// </code>
        /// </example>
        public RangeSliderClientEventsBuilder OnSlide(string handlerName)
        {
            Guard.IsNotNullOrEmpty(handlerName, "handlerName");

            clientEvents.OnSlide.HandlerName = handlerName;

            return this;
        }
    }
}