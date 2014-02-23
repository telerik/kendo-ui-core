namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;

    public class ChartLogarithmicAxis<T>: ChartNumericAxis<T> where T:class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartLogarithmicAxis{T}" /> class.
        /// </summary>
        /// <param name="chart">The chart.</param>
        public ChartLogarithmicAxis(Chart<T> chart)
            : base(chart)
        {
        }

        public override IChartSerializer CreateSerializer()
        {
            return new ChartLogarithmicAxisSerializer(this);
        }
    }
}
