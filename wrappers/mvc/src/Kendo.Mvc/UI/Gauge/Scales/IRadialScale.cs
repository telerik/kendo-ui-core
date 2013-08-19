namespace Kendo.Mvc.UI
{
    public interface IRadialScale : IGaugeScale
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
        /// The width of the range indicators
        /// </summary>
        double? RangeSize { get; set; }

        /// <summary>
        /// The distance from the range indicators to the ticks
        /// </summary>
        double? RangeDistance { get; set; }

        /// <summary>
        /// The scale labels.
        /// </summary>
        GaugeRadialScaleLabels Labels { get; set; }
    }
}
