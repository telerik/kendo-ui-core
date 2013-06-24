namespace Kendo.Mvc.UI.Fluent
{
    using Kendo.Mvc.Resources;
    using System;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="Barcode"/>.
    /// </summary>
    public class BarcodeBorderBuilder : IHideObjectMembers
    {
        private BarcodeElementBorder border;

        public BarcodeBorderBuilder(BarcodeElementBorder element)
        {
            this.border = element;
        }

        public BarcodeBorderBuilder Color(string color)
        {
            border.Color = color;
            return this;
        }

        public BarcodeBorderBuilder Width(int width)
        {
            border.Width = width;
            return this;
        }
       
        public BarcodeBorderBuilder DashType(ChartDashType dashType)
        {
            border.DashType = dashType;
            return this;
        }
    }
}
