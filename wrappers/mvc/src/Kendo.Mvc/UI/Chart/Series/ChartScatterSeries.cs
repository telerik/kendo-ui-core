namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq.Expressions;
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.Resources;
    using System.Collections;

    public class ChartScatterSeries<TModel, TXValue, TYValue> : ChartScatterSeriesBase<TModel, TXValue, TYValue>, IChartScatterSeries where TModel : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartScatterSeries{TModel, TXValue, TYValue}" /> class.
        /// </summary>
        /// <param name="xValueExpression">The X expression.</param>
        /// <param name="yValueExpression">The Y expression.</param>
        /// <param name="noteTextExpression">The note text expression.</param>
        public ChartScatterSeries(
            Expression<Func<TModel, TXValue>> xValueExpression,
            Expression<Func<TModel, TYValue>> yValueExpression,
            Expression<Func<TModel, string>> noteTextExpression)
            : base(xValueExpression, yValueExpression, noteTextExpression)
        { 
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartScatterSeries{TModel, TXValue, TYValue}" /> class.
        /// </summary>
        /// <param name="data">The data.</param>
        public ChartScatterSeries(IEnumerable data)
            : base(data)
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartScatterSeries{TModel, TXValue, TYValue}" /> class.
        /// </summary>
        public ChartScatterSeries()
            : base()
        {
        }

        /// <summary>
        /// The scatter chart error bars configuration.
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
        }

        public override IChartSerializer CreateSerializer()
        {
            return new ChartScatterSeriesSerializer(this);
        }
    }
}