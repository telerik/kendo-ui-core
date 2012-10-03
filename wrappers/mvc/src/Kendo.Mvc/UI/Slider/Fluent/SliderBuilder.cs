namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using Kendo.Mvc.Infrastructure;

    /// <summary>Defines the fluent interface for configuring the <see cref="Slider{T}"/>component.</summary>
    public class SliderBuilder<T> : WidgetBuilderBase<Slider<T>, SliderBuilder<T>>, IHideObjectMembers where T : struct, IComparable
    {
        /// <summary>Initializes a new instance of the <see cref="SliderBuilder{T}"/>class.</summary>
        /// <param name="component">The component.</param>
        public SliderBuilder(Slider<T> component)
            : base(component)
        { }

        /// <summary>Sets the value of the slider.</summary>
        public SliderBuilder<T> Value(T? value)
        {
            if (value.HasValue)
            {
                Component.Value = value.Value;    
            }

            return this;
        }

        /// <summary>Sets the title of the slider draghandle.</summary>
        public SliderBuilder<T> DragHandleTitle(string title)
        {
            Component.DragHandleTitle = title;

            return this;
        }

        /// <summary>Sets the title of the slider increase button.</summary>
        public SliderBuilder<T> IncreaseButtonTitle(string title)
        {
            Component.IncreaseButtonTitle = title;

            return this;
        }

        /// <summary>Sets whether slider to be rendered with increase/decrease button.</summary>
        public SliderBuilder<T> ShowButtons(bool? value)
        {
            Component.ShowButtons = value;

            return this;
        }

        /// <summary>Sets the title of the slider decrease button.</summary>
        public SliderBuilder<T> DecreaseButtonTitle(string title)
        {

            Component.DecreaseButtonTitle = title;

            return this;
        }

        /// <summary>Sets orientation of the slider.</summary>
        public SliderBuilder<T> Orientation(SliderOrientation orientation)
        {
            Component.Orientation = orientation;

            return this;
        }

        /// <summary>Sets a value indicating how to display the tick marks on the slider.</summary>
        public SliderBuilder<T> TickPlacement(SliderTickPlacement tickPlacement)
        {
            Component.TickPlacement = tickPlacement;

            return this;
        }

        /// <summary>Sets the minimum value of the slider.</summary>
        public SliderBuilder<T> Min(T value)
        {
            Component.Min = value;

            return this;
        }

        /// <summary>Sets the maximum value of the slider.</summary>
        public SliderBuilder<T> Max(T value)
        {
            Component.Max = value;

            return this;
        }

        /// <summary>Sets the step with which the slider value will change.</summary>
        public SliderBuilder<T> SmallStep(T value)
        {
            Component.SmallStep = value;

            return this;
        }

        /// <summary>Sets the delta with which the value will change when user click on the slider.</summary>
        public SliderBuilder<T> LargeStep(T value)
        {
            Component.LargeStep = value;

            return this;
        }

        /// <summary>Display tooltip while drag.</summary>
        public SliderBuilder<T> Tooltip(bool value)
        {
            Component.Settings.Enabled = value;

            return this;
        }

        /// <summary>
        /// Use it to configure tooltip.
        /// </summary>
        /// <param name="configurator">Use builder to set different tooltip options.</param>
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
        public SliderBuilder<T> Tooltip(Action<SliderTooltipBuilder> action)
        {
            action(new SliderTooltipBuilder(Component.Settings));

            return this;
        }

        /// <summary>Configures the client-side events.</summary>
        /// <param name="events">The client events action.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Slider()
        ///            .Name("Slider")
        ///            .Events(events =>
        ///                events.OnChange("onChange"))
        /// %&gt;
        /// </code>
        /// </example>
        public SliderBuilder<T> Events(Action<SliderEventBuilder> events)
        {

            events(new SliderEventBuilder(Component.Events));

            return this;
        }
    }
}