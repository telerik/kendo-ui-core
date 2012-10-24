namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq.Expressions;
    using System.Collections;

    public class ChartScatterLineSeries<TModel, TXValue, TYValue>
        : ChartScatterSeries<TModel, TXValue, TYValue>, IChartScatterLineSeries
        where TModel : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartScatterLineSeries{TModel, TXValue, TYValue}" /> class.
        /// </summary>
        /// <param name="xValueExpression">The X expression.</param>
        /// <param name="yValueExpression">The Y expression.</param>
        public ChartScatterLineSeries(Expression<Func<TModel, TXValue>> xValueExpression, Expression<Func<TModel, TYValue>> yValueExpression)
            : base(xValueExpression, yValueExpression)
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartScatterLineSeries{TModel, TXValue, TYValue}" /> class.
        /// </summary>
        /// <param name="data">The data.</param>
        public ChartScatterLineSeries(IEnumerable data)
            : base(data)
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartScatterLineSeries{TModel, TXValue, TYValue}" /> class.
        /// </summary>
        public ChartScatterLineSeries()
            : base()
        {
        }

        /// <summary>
        /// The chart line width.
        /// </summary>
        public double? Width
        {
            get;
            set;
        }

        /// <summary>
        /// The chart line dashType.
        /// </summary>
        public ChartDashType? DashType
        {
            get;
            set;
        }

        /// <summary>
        /// The behavior for handling missing values in scatter line series.
        /// </summary>
        public ChartScatterLineMissingValues? MissingValues
        {
            get;
            set;
        }

        public override IChartSerializer CreateSerializer()
        {
            return new ChartScatterLineSeriesSerializer(this);
        }
    }
}