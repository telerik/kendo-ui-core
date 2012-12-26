namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;
    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="DatePickerBase"/> component.
    /// </summary>
    public class ColorPickerBuilder : WidgetBuilderBase<ColorPicker, ColorPickerBuilder>, IHideObjectMembers
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ColorPickerBuilder"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public ColorPickerBuilder(ColorPicker component)
            : base(component)
        {
        }

        /// <summary>
        /// Configures the client-side events.
        /// </summary>
        /// <param name="clientEventsAction">The client events action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().ColorPicker()
        ///             .Name("ColorPicker")
        ///             .Events(events =>
        ///                 events.Select("select").Change("change")
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public ColorPickerBuilder Events(Action<ColorPickerEventBuilder> clientEventsAction)
        {
            clientEventsAction(new ColorPickerEventBuilder(Component.Events));

            return this;
        }

        /// <summary>
        /// Sets the value of the picker input
        /// </summary>
        public ColorPickerBuilder Value(string color)
        {
            Component.Value = color;

            return this;
        }
    }
}