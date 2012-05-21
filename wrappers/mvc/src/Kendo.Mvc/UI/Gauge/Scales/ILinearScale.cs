namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;

    /// <summary>
    /// Defines a generic IRadialScale.
    /// </summary>
    public interface ILinearScale : IGaugeScale
    {
        /// <summary>
        /// The scale end angle.s
        /// </summary>
        double? EndAngle { get; set; }

        /// <summary>
        /// The scale start angle.
        /// </summary>
        double? StartAngle { get; set; }
    }
}
