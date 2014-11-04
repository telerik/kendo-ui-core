namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;
    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="DatePickerBase"/> component.
    /// </summary>
    public class ColorPickerBuilder : WidgetBuilderBase<ColorPicker, ColorPickerBuilder>, IHideObjectMembers
    {
        private readonly ColorPicker container;

        /// <summary>
        /// Initializes a new instance of the <see cref="ColorPickerBuilder"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public ColorPickerBuilder(ColorPicker component)
            : base(component)
        {
            container = component;
        }

        //>> Fields
        
        /// <summary>
        /// Specifies whether the widget should display the Apply / Cancel buttons.Applicable only for the HSV selector, when a pallete is not specified.
        /// </summary>
        /// <param name="value">The value that configures the buttons.</param>
        public ColorPickerBuilder Buttons(bool value)
        {
            container.Buttons = value;

            return this;
        }
        
        /// <summary>
        /// The number of columns to show in the color dropdown when a pallete is specified.
		/// This is automatically initialized for the "basic" and "websafe" palettes.
		/// If you use a custom palette then you can set this to some value that makes sense for your colors.
        /// </summary>
        /// <param name="value">The value that configures the columns.</param>
        public ColorPickerBuilder Columns(double value)
        {
            container.Columns = value;

            return this;
        }
        
        /// <summary>
        /// Allows localization of the strings that are used in the widget.
        /// </summary>
        /// <param name="configurator">The action that configures the messages.</param>
        public ColorPickerBuilder Messages(Action<ColorPickerMessagesSettingsBuilder> configurator)
        {
            configurator(new ColorPickerMessagesSettingsBuilder(container.Messages));
            return this;
        }
        
        /// <summary>
        /// Only for the HSV selector.  If true, the widget will display the opacity slider.
		/// Note that currently in HTML5 the &lt;input type="color"&gt; does not support opacity.
        /// </summary>
        /// <param name="value">The value that configures the opacity.</param>
        public ColorPickerBuilder Opacity(bool value)
        {
            container.Opacity = value;

            return this;
        }
        
        /// <summary>
        /// Only applicable for the HSV selector.Displays the color preview element, along with an input field where the end user can paste a color in a CSS-supported notation.
        /// </summary>
        /// <param name="value">The value that configures the preview.</param>
        public ColorPickerBuilder Preview(bool value)
        {
            container.Preview = value;

            return this;
        }
        
        /// <summary>
        /// A CSS class name to display an icon in the color picker button.  If
		/// specified, the HTML for the element will look like this:
        /// </summary>
        /// <param name="value">The value that configures the toolicon.</param>
        public ColorPickerBuilder ToolIcon(string value)
        {
            container.ToolIcon = value;

            return this;
        }
        
        /// <summary>
        /// The initially selected color.
		/// Note that when initializing the widget from an &lt;input&gt; element, the initial color will be decided by the field instead.
        /// </summary>
        /// <param name="value">The value that configures the value.</param>
        public ColorPickerBuilder Value(string value)
        {
            container.Value = value;

            return this;
        }
        
        //<< Fields

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