namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq.Expressions;
    using System.Collections;

    public class ChartPolarLineSeries<TModel, TXValue, TYValue> : ChartScatterSeries<TModel, TXValue, TYValue> where TModel : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartPolarLineSeries{TModel, TXValue, TYValue}" /> class.
        /// </summary>
        /// <param name="xValueExpression">The X expression.</param>
        /// <param name="yValueExpression">The Y expression.</param>
        public ChartPolarLineSeries(Expression<Func<TModel, TXValue>> xValueExpression, Expression<Func<TModel, TYValue>> yValueExpression)
            : base(xValueExpression, yValueExpression)
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartPolarLineSeries{TModel, TXValue, TYValue}" /> class.
        /// </summary>
        /// <param name="data">The data.</param>
        public ChartPolarLineSeries(IEnumerable data)
            : base(data)
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartPolarLineSeries{TModel, TXValue, TYValue}" /> class.
        /// </summary>
        public ChartPolarLineSeries()
            : base()
        {
        }

        public override IChartSerializer CreateSerializer()
        {
            return new ChartPolarLineSeriesSerializer(this);
        }
    }
}