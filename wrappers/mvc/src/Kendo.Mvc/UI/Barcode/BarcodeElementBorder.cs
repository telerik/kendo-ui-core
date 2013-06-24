namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using System;

    public class BarcodeElementBorder
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="BarcodeElementBorder" /> class.
        /// </summary>
        public BarcodeElementBorder(int? width, string color, ChartDashType? dashType)
        {
            Width = width;
            Color = color;
            DashType = dashType;
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="BarcodeElementBorder" /> class.
        /// </summary>
        public BarcodeElementBorder()
        {
        }

        /// <summary>
        /// Gets or sets the width of the border.
        /// </summary>
        public int? Width
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the color of the border.
        /// </summary>
        public string Color
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the dash type of the border.
        /// </summary>
        public ChartDashType? DashType
        {
            get;
            set;
        }

        public IChartSerializer CreateSerializer()
        {
            return new BarcodeElementBorderSerializer(this);
        }
    }
}
