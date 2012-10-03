namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Linq;
    using Kendo.Mvc.Infrastructure;

    /// <summary>Defines the fluent interface for configuring the <see cref="RangeSlider{T}"/>component.</summary>
    public class RangeSliderBuilder<T> : WidgetBuilderBase<RangeSlider<T>, RangeSliderBuilder<T>>, IHideObjectMembers where T : struct, IComparable
    {
        /// <summary>Initializes a new instance of the <see cref="RangeSliderBuilder{T}"/>class.</summary>
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
            if (range == null)
            {
                return this;
            }
 
            if (range.Count() >= 1)
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
            Component.Min = value;

            return this;
        }

        /// <summary>Sets the maximum value of the range slider.</summary>
        public RangeSliderBuilder<T> Max(T value)
        {
            Component.Max = value;

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
        /// <param name="action">Use builder to set different tooltip options.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Slider()
        ///            .Name("Slider")
        ///            .Tooltip(tooltip => tooltip
        ///                .Enable(true)
        ///                .Format("{0:P}")
        ///            );
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
        /// &lt;%= Html.Kendo().RangeSlider()
        ///            .Name("RangeSlider")
        ///            .Events(events =>
        ///                events.OnChange("onChange"))
        /// %&gt;
        /// </code>
        /// </example>
        public RangeSliderBuilder<T> Events(Action<RangeSliderEventBuilder> events)
        {

            events(new RangeSliderEventBuilder(Component.Events));

            return this;
        }

        /// <summary>Sets the title of the slider draghandle.</summary>
        public RangeSliderBuilder<T> LeftDragHandleTitle(string title)
        {
            Component.LeftDragHandleTitle = title;

            return this;
        }

        /// <summary>Sets the title of the slider draghandle.</summary>
        public RangeSliderBuilder<T> RightDragHandleTitle(string title)
        {
            Component.RightDragHandleTitle = title;

            return this;
        }
    }
}