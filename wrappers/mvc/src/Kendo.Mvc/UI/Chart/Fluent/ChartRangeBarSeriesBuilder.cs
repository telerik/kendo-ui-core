namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using Kendo.Mvc.UI;
    using System.ComponentModel;

    public class ChartRangeBarSeriesBuilder<T> : ChartBarSeriesBuilderBase<IChartBarSeries, ChartBarSeriesBuilder<T>>
        where T : class
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="series"></param>
        public ChartRangeBarSeriesBuilder(IChartRangeBarSeries series)
            : base((IChartBarSeries)series)
        {

        }

        [EditorBrowsable(EditorBrowsableState.Never)]
        public override ChartBarSeriesBuilder<T> Stack(bool stacked)
        {
            return base.Stack(stacked);
        }

        [EditorBrowsable(EditorBrowsableState.Never)]
        public override ChartBarSeriesBuilder<T> Stack(string stackGroup)
        {
            return base.Stack(stackGroup);
        }

        [EditorBrowsable(EditorBrowsableState.Never)]
        public override ChartBarSeriesBuilder<T> Stack(ChartStackType stackType, string stackGroup = null)
        {
            return base.Stack(stackType, stackGroup);
        }

        [EditorBrowsable(EditorBrowsableState.Never)]
        public override ChartBarSeriesBuilder<T> Aggregate(ChartSeriesAggregate aggregate)
        {
            return base.Aggregate(aggregate);
        }
    }
}
