using System.Collections.Generic;
using System;
namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring polar axis.
    /// </summary>
    public class ChartPolarAxisBuilder : ChartNumericAxisBuilder
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartPolarAxisBuilder"/> class.
        /// </summary>
        /// <param name="axis">The axis.</param>
        public ChartPolarAxisBuilder(IChartNumericAxis axis)
            : base(axis)
        {
        }

        /// <summary>
        /// The angle (degrees) where the 0 value is placed.
        /// It defaults to 0.
        /// </summary>
        /// <param name="startAngle">Angles increase counterclockwise and 0 is to the right. Negative values are acceptable.</param>
        public override ChartNumericAxisBuilder StartAngle(double startAngle)
        {
            base.StartAngle(startAngle);

            return this;
        }
    }
}