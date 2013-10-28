namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq.Expressions;
    using System.Collections;

    public class ChartPolarLineSeries<TModel, TXValue, TYValue> : ChartScatterLineSeriesBase<TModel, TXValue, TYValue>, IChartPolarLineSeries where TModel : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartPolarLineSeries{TModel, TXValue, TYValue}" /> class.
        /// </summary>
        /// <param name="xValueExpression">The X expression.</param>
        /// <param name="yValueExpression">The Y expression.</param>
        /// <param name="noteTextExpression">The note text expression.</param>
        public ChartPolarLineSeries(
            Expression<Func<TModel, TXValue>> xValueExpression,
            Expression<Func<TModel, TYValue>> yValueExpression,
            Expression<Func<TModel, string>> noteTextExpression)
            : base(xValueExpression, yValueExpression, noteTextExpression)
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

        /// <summary>
        /// The style of the series.
        /// </summary>
        public ChartPolarLineStyle Style
        {
            get;
            set;
        }

        protected override void Initialize()
        {
            base.Initialize();            
            Style = ChartPolarLineStyle.Normal;
        }

        public override IChartSerializer CreateSerializer()
        {
            return new ChartPolarLineSeriesSerializer(this);
        }
    }
}