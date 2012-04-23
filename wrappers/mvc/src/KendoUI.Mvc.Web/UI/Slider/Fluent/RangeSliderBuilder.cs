// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Fluent
{
    using System;
    using System.Linq;
    using Telerik.Web.Mvc.Infrastructure;

    /// <summary>Defines the fluent interface for configuring the <see cref="RangeSlider"/>component.</summary>
    public class RangeSliderBuilder<T> : ViewComponentBuilderBase<RangeSlider<T>, RangeSliderBuilder<T>>, IHideObjectMembers where T : struct, IComparable
    {
        /// <summary>Initializes a new instance of the <see cref="RangeSliderBuilder"/>class.</summary>
        /// <param name="component">The component.</param>
        public RangeSliderBuilder(RangeSlider<T> component)
            : base(component)
        { }

        /// <summary>Sets the value of the range slider.</summary>
        public RangeSliderBuilder<T> Values(T? selectionStart, T? selectionEnd)
        {
            if (selectionStart.HasValue)
            {
                Component.SelectionStart = selectionStart.Value;
            }

            if (selectionEnd.HasValue)
            {
                Component.SelectionEnd = selectionEnd.Value;
            }

            return this;
        }

        /// <summary>Sets the value of the range slider.</summary>
        public RangeSliderBuilder<T> Values(T[] range)
        {
            if (range != null && range.Count() >= 1)
            {
                Component.SelectionStart = range.First();
            }

            if (range.Count() > 1)
            {
                Component.SelectionEnd = range[1];
            }

            return this;
        }

        /// <summary>Sets orientation of the range slider.</summary>
        public RangeSliderBuilder<T> Orientation(SliderOrientation orientation)
        {
            Component.Orientation = orientation;

            return this;
        }

        /// <summary>Sets a value indicating how to display the tick marks on the range slider.</summary>
        public RangeSliderBuilder<T> TickPlacement(SliderTickPlacement tickPlacement)
        {
            Component.TickPlacement = tickPlacement;

            return this;
        }

        /// <summary>Sets the minimum value of the range slider.</summary>
        public RangeSliderBuilder<T> Min(T value)
        {
            Component.MinValue = value;

            return this;
        }

        /// <summary>Sets the maximum value of the range slider.</summary>
        public RangeSliderBuilder<T> Max(T value)
        {
            Component.MaxValue = value;

            return this;
        }

        /// <summary>Sets the step with which the range slider value will change.</summary>
        public RangeSliderBuilder<T> SmallStep(T value)
        {
            Component.SmallStep = value;

            return this;
        }

        /// <summary>Sets the delta with which the value will change when user click on the track.</summary>
        public RangeSliderBuilder<T> LargeStep(T value)
        {
            Component.LargeStep = value;

            return this;
        }

        /// <summary>Display tooltip while drag.</summary>
        public RangeSliderBuilder<T> Tooltip(bool value)
        {
            Component.Settings.Enabled = value;

            return this;
        }

        /// <summary>
        /// Use it to configure tooltip while drag.
        /// </summary>
        /// <param name="configurator">Use builder to set different tooltip options.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Slider()
        ///             .Name("Slider")
        ///             .Tooltip(tooltip => tooltip
        ///                 .Enable(true)
        ///                 .Format("{0:P}")
        ///             );
        /// %&gt;
        /// </code>
        /// </example>
        public RangeSliderBuilder<T> Tooltip(Action<SliderTooltipBuilder> action)
        {
            action(new SliderTooltipBuilder(Component.Settings));

            return this;
        }

        /// <summary>Configures the client-side events.</summary>
        /// <param name="events">The client events action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().RangeSlider()
        ///             .Name("RangeSlider")
        ///             .ClientEvents(events =>
        ///                 events.OnLoad("onLoad").OnChange("onChange"))
        /// %&gt;
        /// </code>
        /// </example>
        public RangeSliderBuilder<T> ClientEvents(Action<RangeSliderClientEventsBuilder> events)
        {
            Guard.IsNotNull(events, "events");

            events(new RangeSliderClientEventsBuilder(Component.ClientEvents));

            return this;
        }

        /// <summary>Sets a value indicating whether the range slider can respond to user interaction.</summary>
        public RangeSliderBuilder<T> Enable(bool value)
        {
            Component.Enabled = value;

            return this;
        }
    }
}