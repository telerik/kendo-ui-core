namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq.Expressions;
    using System.Collections;
    using Kendo.Mvc.Extensions;

    public class ChartScatterLineSeries<TModel, TXValue, TYValue>
        : ChartScatterLineSeriesBase<TModel, TXValue, TYValue>, IChartScatterLineSeries
        where TModel : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartScatterLineSeries{TModel, TXValue, TYValue}" /> class.
        /// </summary>
        /// <param name="xValueExpression">The X expression.</param>
        /// <param name="yValueExpression">The Y expression.</param>
        /// <param name="noteTextExpression">The note text expression.</param>
        public ChartScatterLineSeries(
            Expression<Func<TModel, TXValue>> xValueExpression,
            Expression<Func<TModel, TYValue>> yValueExpression,
            Expression<Func<TModel, string>> noteTextExpression)
            : base(xValueExpression, yValueExpression, noteTextExpression)
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
        /// The style of the series.
        /// </summary>
        public ChartScatterLineStyle Style
        {
            get;
            set;
        }

        /// <summary>
        /// The error bars of the series.
        /// </summary>
        public ScatterErrorBars ErrorBars
        {
            get;
            set;
        }

        protected override void Initialize()
        {
            base.Initialize();
            ErrorBars = new ScatterErrorBars();
            Style = ChartScatterLineStyle.Normal;
        }

        public override IChartSerializer CreateSerializer()
        {
            return new ChartScatterLineSeriesSerializer(this);
        }
    }
}