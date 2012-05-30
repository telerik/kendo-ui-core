namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;

    /// <summary>
    /// Represents a gauge scale base.
    /// </summary>
    public abstract class GaugeScaleBase<T> : IGaugeScale<T> where T : struct
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="GaugeScaleBase{T}" /> class.
        /// </summary>
        public GaugeScaleBase()
        {
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
        public T? Min
        {
            get;
            set;
        }

        /// <summary>
        /// The scale max value.
        /// </summary>
        public T? Max
        {
            get;
            set;
        }

        /// <summary>
        /// The scale reverse.
        /// </summary>
        public bool? Reverse
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