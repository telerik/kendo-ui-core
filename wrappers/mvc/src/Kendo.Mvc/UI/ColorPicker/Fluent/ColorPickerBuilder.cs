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

        /// <summary>
        /// Indicates whether the picker will allow transparent colors to be picked.
        /// </summary>
        /// <param name="allowOpacity">Whether the user is allowed to change the color opacity.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().ColorPicker()
        ///             .Name("ColorPicker")
        ///             .Opacity(true)
        /// %&gt;
        /// </code>
        /// </example>
        public ColorPickerBuilder Opacity(bool allowOpacity)
        {
            Component.Opacity = allowOpacity;

            return this;
        }

        /// <summary>
        /// Sets the range of colors that the user can pick from.
        /// </summary>
        /// <param name="palette">A list of colors.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().ColorPicker()
        ///             .Name("ColorPicker")
        ///             .Palette(new List&lt;string&gt; { "#ff0000", "#00ff00", "#0000ff" })
        /// %&gt;
        /// </code>
        /// </example>
        public ColorPickerBuilder Palette(IEnumerable<string> palette)
        {
            Component.PaletteColors = palette;
            Component.Palette = ColorPickerPalette.None;

            return this;
        }

        /// <summary>
        /// Sets the range of colors that the user can pick from.
        /// </summary>
        /// <param name="palette">One of the preset palettes of colors</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().ColorPicker()
        ///             .Name("ColorPicker")
        ///             .Palette(ColorPickerPalette.WebSafe)
        /// %&gt;
        /// </code>
        /// </example>
        public ColorPickerBuilder Palette(ColorPickerPalette palette)
        {
            Component.PaletteColors = null;
            Component.Palette = palette;

            return this;
        }

        /// <summary>
        /// Sets the range of colors that the user can pick from.
        /// </summary>
        /// <param name="palette">One of the preset palettes of colors</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().ColorPicker()
        ///             .Name("ColorPicker")
        ///             .Palette(ColorPickerPalette.WebSafe)
        /// %&gt;
        /// </code>
        /// </example>

        /// <summary>
        /// Enables or disables the picker.
        /// </summary>
        /// <param name="value">Whether the picker is enabled</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().ColorPicker()
        ///             .Name("ColorPicker")
        ///             .Enable(false)
        /// %&gt;
        /// </code>
        /// </example>
        public ColorPickerBuilder Enable(bool value)
        {
            Component.Enabled = value;

            return this;
        }
    }
}