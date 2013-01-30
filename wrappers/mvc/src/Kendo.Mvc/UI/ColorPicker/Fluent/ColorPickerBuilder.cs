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

        /// <summary>
        /// Shows or hides the accept/cancel buttons.
        /// </summary>
        /// <param name="value">Whether the buttons should be shown</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().ColorPicker()
        ///             .Name("ColorPicker")
        ///             .Buttons(false)
        /// %&gt;
        /// </code>
        /// </example>
        public ColorPickerBuilder Buttons(bool value)
        {
            Component.Buttons = value;

            return this;
        }

        /// <summary>
        /// Shows a tool icon.
        /// </summary>
        /// <param name="cssClass">The CSS class that will be used for styling</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().ColorPicker()
        ///             .Name("ColorPicker")
        ///             .ToolIcon("k-foreColor")
        /// %&gt;
        /// </code>
        /// </example>
        public ColorPickerBuilder ToolIcon(string cssClass)
        {
            Component.ToolIcon = cssClass;

            return this;
        }

        /// <summary>
        /// Sets the size of the palette tiles
        /// </summary>
        /// <param name="tileSize">The tile size (for square tiles)</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().ColorPalette()
        ///             .Name("ColorPalette")
        ///             .TileSize(32)
        /// %&gt;
        /// </code>
        /// </example>
        public ColorPickerBuilder TileSize(int tileSize)
        {
            Component.TileSize = tileSize;

            return this;
        }

        /// <summary>
        /// Sets the size of the palette tiles
        /// </summary>
        /// <param name="columns">The tile size (for square tiles)</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().ColorPalette()
        ///             .Name("ColorPalette")
        ///             .TileSize(s => s.Width(20).Height(10))
        /// %&gt;
        /// </code>
        /// </example>
        public ColorPickerBuilder TileSize(Action<PaletteSizeBuilder> sizeAction)
        {
            Component.TileSize = new ColorPaletteTileSize();

            sizeAction(new PaletteSizeBuilder(Component.TileSize as ColorPaletteTileSize));

            return this;
        }
    }
}