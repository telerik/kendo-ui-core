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
        /// Sets the value of the barcode
        /// </summary>
        public BarcodeBuilder Value(int value)
        {
            return this.Value(value.ToString());
        }

        /// <summary>
        /// Sets the symbology which will be used to encode the value of the barcode
        /// </summary>
        public BarcodeBuilder Encoding(BarcodeSymbology encoding)
        {
            Component.Encoding = encoding;
            return this;
        }
    }
}
