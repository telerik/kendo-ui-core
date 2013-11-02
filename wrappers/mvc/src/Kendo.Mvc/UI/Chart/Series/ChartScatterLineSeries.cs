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

        /// <summary>
        /// Gets or sets the series x axis error low member name
        /// </summary>
        public string XErrorLowMember
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the series x axis error high member name
        /// </summary>
        public string XErrorHighMember
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the series y axis error low member name
        /// </summary>
        public string YErrorLowMember
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the series y axis error high member name
        /// </summary>
        public string YErrorHighMember
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

    public class ChartScatterLineSeries<TModel, TXValue, TYValue, TXErrorLowValue, TXErrorHighValue, TYErrorLowValue, TYErrorHighValue> :
        ChartScatterLineSeries<TModel, TXValue, TYValue>
        where TModel : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartScatterLineSeries{TModel, TXValue, TYValue, TXErrorLowValue, TXErrorHighValue, TYErrorLowValue, TYErrorHighValue}" /> class.
        /// </summary>
        /// <param name="xValueExpression">The X expression.</param>
        /// <param name="yValueExpression">The Y expression.</param>
        /// <param name="xErrorLowValueExpression">The expression used to extract the point x error low value from the chart model.</param>
        /// <param name="xErrorHighValueExpression">The expression used to extract the point x error high value from the chart model.</param>
        /// <param name="yErrorLowValueExpression">The expression used to extract the point y error low value from the chart model.</param>
        /// <param name="yErrorHighValueExpression">The expression used to extract the point y error high value from the chart model.</param>
        /// <param name="noteTextExpression">The note text expression.</param>
        public ChartScatterLineSeries(
            Expression<Func<TModel, TXValue>> xValueExpression, Expression<Func<TModel, TYValue>> yValueExpression,
            Expression<Func<TModel, TXErrorLowValue>> xErrorLowValueExpression, Expression<Func<TModel, TXErrorHighValue>> xErrorHighValueExpression,
            Expression<Func<TModel, TYErrorLowValue>> yErrorLowValueExpression, Expression<Func<TModel, TYErrorHighValue>> yErrorHighValueExpression,
            Expression<Func<TModel, string>> noteTextExpression)
            : base(xValueExpression, yValueExpression, noteTextExpression)
        {
            if (xErrorLowValueExpression != null)
            {
                XErrorLowMember = xErrorLowValueExpression.MemberWithoutInstance();
            }

            if (xErrorHighValueExpression != null)
            {
                XErrorHighMember = xErrorHighValueExpression.MemberWithoutInstance();
            }

            if (yErrorLowValueExpression != null)
            {
                YErrorLowMember = yErrorLowValueExpression.MemberWithoutInstance();
            }

            if (yErrorHighValueExpression != null)
            {
                YErrorHighMember = yErrorHighValueExpression.MemberWithoutInstance();
            }
        }
    }
}