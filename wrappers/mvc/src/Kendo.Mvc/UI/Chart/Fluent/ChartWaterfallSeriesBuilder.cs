namespace Kendo.Mvc.UI.Fluent
{
    using System;
using System.ComponentModel;
using Kendo.Mvc.UI;

    /// <summary>
    /// Defines the fluent interface for configuring bar series.
    /// </summary>
    /// <typeparam name="T">The type of the data item</typeparam>
    public class ChartWaterfallSeriesBuilder<T> : ChartBarSeriesBuilderBase<IWaterfallSeries, ChartWaterfallSeriesBuilder<T>>
        where T : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartWaterfallSeriesBuilder{T}"/> class.
        /// </summary>
        /// <param name="series">The series.</param>
        public ChartWaterfallSeriesBuilder(IWaterfallSeries series)
            : base(series)
        {
        }

        [EditorBrowsable(EditorBrowsableState.Never)]
        public override ChartWaterfallSeriesBuilder<T> Aggregate(ChartSeriesAggregate aggregate)
        {
            return base.Aggregate(aggregate);
        }

        [EditorBrowsable(EditorBrowsableState.Never)]
        public override ChartWaterfallSeriesBuilder<T> Stack(bool stacked)
        {
            return base.Stack(stacked);
        }

        [EditorBrowsable(EditorBrowsableState.Never)]
        public override ChartWaterfallSeriesBuilder<T> Stack(ChartStackType stackType, string stackGroup = null)
        {
            return base.Stack(stackType, stackGroup);
        }

        [EditorBrowsable(EditorBrowsableState.Never)]
        public override ChartWaterfallSeriesBuilder<T> Stack(string stackGroup)
        {
            return base.Stack(stackGroup);
        }
    }
}