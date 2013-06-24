namespace Kendo.Mvc.UI.Fluent
{
    using Kendo.Mvc.Resources;
    using System;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="Barcode"/>.
    /// </summary>
    public class BarcodeSpacingBuilder : IHideObjectMembers
    {
        private ChartSpacing padding;
        public BarcodeSpacingBuilder(ChartSpacing spacing)
        {
            this.padding = spacing;
        }

        public BarcodeSpacingBuilder Top(int top)
        {
            padding.Top = top;
            return this;
        }

        public BarcodeSpacingBuilder Bottom(int bottom)
        {
            padding.Bottom = bottom;
            return this;
        }

        public BarcodeSpacingBuilder Left(int left)
        {
            padding.Left = left;
            return this;
        }

        public BarcodeSpacingBuilder Right(int right)
        {
            padding.Right = right;
            return this;
        } 
    }
}
