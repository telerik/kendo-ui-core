namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;

    public interface IGaugeScale
    {
        /// <summary>
        /// The scale ranges.
        /// </summary>
        IList<GaugeScaleRanges> Ranges { get; set; }

        /// <summary>
        /// The scale major unit.
        /// </summary>
        double? MajorUnit { get; set; }

        /// <summary>
        /// The scale major unit.
        /// </summary>
        double? MinorUnit { get; set; }

        /// <summary>
        /// The scale major ticks configuration.
        /// </summary>
        GaugeScaleTicks MajorTicks { get; set; }

        /// <summary>
        /// The scale minor ticks configuration.
        /// </summary>
        GaugeScaleTicks MinorTicks { get; set; }

        /// <summary>
        /// The scale min value.
        /// </summary>
        double? Min { get; set; }

        /// <summary>
        /// The scale max value.
        /// </summary>
        double? Max { get; set; }

        /// <summary>
        /// The scale reverse.
        /// </summary>
        bool? Reverse { get; set; }

        /// <summary>
        /// The line.
        /// </summary>
        ChartLine Line { get; set; }

        IChartSerializer CreateSerializer();
    }
}
