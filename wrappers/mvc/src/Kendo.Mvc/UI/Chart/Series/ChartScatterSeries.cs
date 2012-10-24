namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq.Expressions;
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.Resources;
    using System.Collections;

    public class ChartScatterSeries<TModel, TXValue, TYValue> : ChartSeriesBase<TModel>, IChartScatterSeries where TModel : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartScatterSeries{TModel, TXValue, TYValue}" /> class.
        /// </summary>
        /// <param name="xValueExpression">The X expression.</param>
        /// <param name="yValueExpression">The Y expression.</param>
        public ChartScatterSeries(Expression<Func<TModel, TXValue>> xValueExpression, Expression<Func<TModel, TYValue>> yValueExpression)
            : base()
        {
            if (typeof(TModel).IsPlainType() && !(xValueExpression.IsBindable() || yValueExpression.IsBindable()))
            {
                throw new InvalidOperationException(Exceptions.MemberExpressionRequired);
            }

            XMember = xValueExpression.MemberWithoutInstance();
            YMember = yValueExpression.MemberWithoutInstance();

            Initialize();
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartScatterSeries{TModel, TXValue, TYValue}" /> class.
        /// </summary>
        /// <param name="data">The data.</param>
        public ChartScatterSeries(IEnumerable data)
            : base()
        {
            Data = data;
            Initialize();
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartScatterSeries{TModel, TXValue, TYValue}" /> class.
        /// </summary>
        /// <param name="chart">The chart.</param>
        public ChartScatterSeries()
            : base()
        {
            Initialize();
        }

        /// <summary>
        /// Gets the model X data member name.
        /// </summary>
        /// <value>The model X data member name.</value>
        public string XMember
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the model Y data member name.
        /// </summary>
        /// <value>The model Y data member name.</value>
        public string YMember
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the X axis name to use for this series.
        /// </summary>
        public string XAxis
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the Y axis name to use for this series.
        /// </summary>
        public string YAxis
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the scatter chart data labels configuration
        /// </summary>
        public ChartPointLabels Labels
        {
            get;
            set;
        }

        /// <summary>
        /// The line chart markers configuration.
        /// </summary>
        public ChartMarkers Markers
        {
            get;
            set;
        }

        /// <summary>
        /// The scatter chart data source.
        /// </summary>
        public IEnumerable Data
        {
            get;
            set;
        }

        protected virtual void Initialize()
        {
            Labels = new ChartPointLabels();
            Markers = new ChartMarkers();
        }

        public override IChartSerializer CreateSerializer()
        {
            return new ChartScatterSeriesSerializer(this);
        }
    }
}