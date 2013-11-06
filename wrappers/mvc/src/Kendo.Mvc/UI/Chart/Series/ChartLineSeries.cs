namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections;
    using System.Linq.Expressions;
    using Kendo.Mvc.Extensions;

    public class ChartLineSeries<TModel, TValue, TCategory> : ChartLineSeriesBase<TModel, TValue, TCategory>, IChartLineSeries where TModel : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartLineSeries{TModel, TValue, TCategory}"/> class.
        /// </summary>
        /// <param name="expression">The expression used to extract the point value from the chart model.</param>
        /// <param name="categoryExpression">The expression used to extract the point category from the chart model.</param>
        /// <param name="noteTextExpression">The expression used to extract the point note text from the chart model.</param>
        public ChartLineSeries(Expression<Func<TModel, TValue>> expression, Expression<Func<TModel, TCategory>> categoryExpression, Expression<Func<TModel, string>> noteTextExpression)
            : base(expression, categoryExpression, noteTextExpression)
        {            
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartLineSeries{TModel, TValue, TCategory}"/> class.
        /// </summary>
        /// <param name="data">The data to bind to.</param>
        public ChartLineSeries(IEnumerable data)
            : base(data)
        {            
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartLineSeries{TModel, TValue, TCategory}" /> class.
        /// </summary>
        public ChartLineSeries()
            : base()
        {            
        }

        /// <summary>
        /// The style of the line.
        /// </summary>
        public ChartLineStyle Style
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the series error bars options
        /// </summary>
        public CategoricalErrorBars ErrorBars
        {
            get;
            set;
        }

        public override IChartSerializer CreateSerializer()
        {
            return new ChartLineSeriesSerializer(this);
        }

        protected override void Initialize()
        {
            base.Initialize();
            Style = ChartLineStyle.Normal;
            ErrorBars = new CategoricalErrorBars();
        }

    }

    public class ChartLineSeries<TModel, TValue> : ChartLineSeries<TModel, TValue, string> where TModel : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartLineSeries{TModel, TValue}" /> class.
        /// </summary>
        /// <param name="expression">The expression used to extract the point value from the chart model.</param>
        public ChartLineSeries(Expression<Func<TModel, TValue>> expression)
            : base(expression, null, null)
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartLineSeries{TModel, TValue}" /> class.
        /// </summary>
        /// <param name="data">The data to bind to.</param>
        public ChartLineSeries(IEnumerable data)
            : base(data)
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartLineSeries{TModel, TValue}" /> class.
        /// </summary>
        public ChartLineSeries()
        {
        }
    }
}