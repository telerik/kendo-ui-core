namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Defines a generic IRadialScale.
    /// </summary>
    public interface IRadialScale<T> : IGaugeScale<T>
        where T : struct
    {
        /// <summary>
        /// The scale end angle.s
        /// </summary>
        double? EndAngle { get; set; }

        /// <summary>
        /// The scale start angle.
        /// </summary>
        double? StartAngle { get; set; }

        /// <summary>
        /// The scale labels.
        /// </summary>
        GaugeRadialScaleLabels Labels { get; set; }
    }
}
