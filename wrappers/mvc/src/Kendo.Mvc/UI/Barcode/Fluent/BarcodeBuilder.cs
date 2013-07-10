namespace Kendo.Mvc.UI.Fluent
{
    using Kendo.Mvc.Resources;
    using System;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="Barcode"/>.
    /// </summary>
    public class BarcodeBuilder : WidgetBuilderBase<Barcode, BarcodeBuilder>, IHideObjectMembers
    {
        public BarcodeBuilder(Barcode component)
            : base(component)
        {

        }

        /// <summary>
        /// Sets the value of the barcode
        /// </summary>
        public BarcodeBuilder Value(string value)
        {
            Component.Value = value;

            return this;
        }

        /// <summary>
        /// Sets the preferred rendering engine.
        /// If it is not supported by the browser, the Chart will switch to the first available mode.
        /// </summary>
        /// <param name="renderAs">The preferred rendering engine.</param>
        public BarcodeBuilder RenderAs(RenderingMode renderAs)
        {
            Component.RenderAs = renderAs;
            return this;
        }

        /// <summary>
        /// Sets the value of the barcode
        /// </summary>
        public BarcodeBuilder Value(int value)
        {
            return this.Value(value.ToString());
        }

        /// <summary>
        /// Sets the background color of the barcode area
        /// </summary>
        public BarcodeBuilder Background(string value)
        {
            Component.Background = value;

            return this;
        }

        /// <summary>
        /// Configures the options for the border of the Barcode
        /// </summary>
        public BarcodeBuilder Border(Action<BarcodeBorderBuilder> configurator)
        {
            configurator(new BarcodeBorderBuilder(Component.Border));

            return this;
        }

        /// <summary>
        /// Configurator to fine tune the padding options
        /// </summary>
        public BarcodeBuilder Padding(Action<BarcodeSpacingBuilder> configurator)
        {
            configurator(new BarcodeSpacingBuilder(Component.Padding));

            return this;
        }

        /// <summary>
        /// Specifies padding for top,bottom,right and left at once.
        /// </summary>
        public BarcodeBuilder Padding(int padding)
        {
            Component.Padding.Top = Component.Padding.Bottom =
                Component.Padding.Left = Component.Padding.Right = padding;

            return this;
        }

        /// <summary>
        /// Specifies whether the Checksum should be displayed next to the text or not
        /// </summary>
        public BarcodeBuilder Checksum(bool checksum)
        {
            Component.Checksum = checksum;
            return this;
        }

        /// <summary>
        /// Specifies the color of the bars
        /// </summary>
        public BarcodeBuilder Color(string color)
        {
            Component.Color = color;
            return this;
        }

        /// <summary>
        /// Configures options for the Text of the Barcode
        /// </summary>
        public BarcodeBuilder Text(Action<BarcodeTextBuilder> configurator)
        {
            configurator(new BarcodeTextBuilder(Component.Text));

            return this;
        }

        /// <summary>
        /// Sets the symbology which will be used to encode the value of the barcode
        /// </summary>
        public BarcodeBuilder Encoding(BarcodeSymbology encoding)
        {
            Component.Encoding = encoding;
            return this;
        }

        /// <summary>
        /// Sets the height of the barcode area
        /// </summary>
        public BarcodeBuilder Height(int height)
        {
            Component.Height = height;
            return this;
        }

        /// <summary>
        /// Sets the width of the barcode area
        /// </summary>
        public BarcodeBuilder Width(int width)
        {
            Component.Width = width;
            return this;
        }
    }
}
