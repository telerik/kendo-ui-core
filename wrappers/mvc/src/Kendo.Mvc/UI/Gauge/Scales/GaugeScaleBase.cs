namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;

    public abstract class GaugeScaleBase : IGaugeScale
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="GaugeScaleBase" /> class.
        /// </summary>
        public GaugeScaleBase()
        {
            Ranges = new List<GaugeScaleRanges>();
            MajorTicks = new GaugeScaleTicks();
            MinorTicks = new GaugeScaleTicks();
            Line = new ChartLine();
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
        /// The scale reverse.
        /// </summary>
        public bool? Reverse
        {
            get;
            set;
        }

        /// <summary>
        /// The line reverse.
        /// </summary>
        public ChartLine Line
        {
            get;
            set;
        }

        public abstract IChartSerializer CreateSerializer();
    }
}