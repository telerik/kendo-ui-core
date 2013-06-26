namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq.Expressions;
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.Resources;
    using System.Collections;

    public class ChartPolarScatterSeries<TModel, TXValue, TYValue> : ChartScatterSeries<TModel, TXValue, TYValue> where TModel : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartPolarScatterSeries{TModel, TXValue, TYValue}" /> class.
        /// </summary>
        /// <param name="xValueExpression">The X expression.</param>
        /// <param name="yValueExpression">The Y expression.</param>
        /// <param name="noteTextExpression">The note text expression.</param>
        public ChartPolarScatterSeries(
            Expression<Func<TModel, TXValue>> xValueExpression,
            Expression<Func<TModel, TYValue>> yValueExpression,
            Expression<Func<TModel, string>> noteTextExpression)
            : base(xValueExpression, yValueExpression, noteTextExpression)
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartPolarScatterSeries{TModel, TXValue, TYValue}" /> class.
        /// </summary>
        /// <param name="data">The data.</param>
        public ChartPolarScatterSeries(IEnumerable data)
            : base(data)
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartPolarScatterSeries{TModel, TXValue, TYValue}" /> class.
        /// </summary>
        public ChartPolarScatterSeries()
            : base()
        {
        }

        public override IChartSerializer CreateSerializer()
        {
            return new ChartPolarScatterSeriesSerializer(this);
        }
    }
}