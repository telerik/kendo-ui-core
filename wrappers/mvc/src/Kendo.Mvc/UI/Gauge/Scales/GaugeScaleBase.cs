namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;

    /// <summary>
    /// Represents a gauge scale base.
    /// </summary>
    public abstract class GaugeScaleBase : IGaugeScale
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="GaugeScaleBase" /> class.
        /// </summary>
        public GaugeScaleBase()
        {
            Labels = new GaugeScaleLabels();
            Ranges = new List<GaugeScaleRanges>();
            MajorTicks = new GaugeScaleTicks();
            MinorTicks = new GaugeScaleTicks();
        }

        /// <summary>
        /// The scale major ticks configuration.
        /// </summary>
        public GaugeScaleTicks MajorTicks
        {
            get;
            set;
        }

        /// <summary>
        /// The scale minor ticks configuration.
        /// </summary>
        public GaugeScaleTicks MinorTicks
        {
            get;
            set;
        }

        /// <summary>
        /// The scale labels.
        /// </summary>
        public GaugeScaleLabels Labels
        {
            get;
            set;
        }

        /// <summary>
        /// The scale ranges.
        /// </summary>
        public IList<GaugeScaleRanges> Ranges
        {
            get;
            set;
        }

        /// <summary>
        /// The scale major unit.
        /// </summary>
        public double? MajorUnit
        {
            get;
            set;
        }

        /// <summary>
        /// The scale minor unit.
        /// </summary>
        public double? MinorUnit
        {
            get;
            set;
        }

        /// <summary>
        /// The scale min value.
        /// </summary>
        public double? Min
        {
            get;
            set;
        }

        /// <summary>
        /// The scale max value.
        /// </summary>
        public double? Max
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the scale serializer.
        /// </summary>
        public abstract IChartSerializer CreateSerializer();
    }
}