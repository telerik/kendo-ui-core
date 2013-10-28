namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections;
    using System.Linq.Expressions;

    public class ChartAreaSeries<TModel, TValue, TCategory> : ChartAreaSeriesBase<TModel, TValue, TCategory>, IChartAreaSeries where TModel : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartAreaSeries{TModel, TValue, TCategory}" /> class.
        /// </summary>
        /// <param name="expression">The expression used to extract the point value from the chart model.</param>
        /// <param name="categoryExpression">The expression used to extract the point category from the chart model.</param>
        /// <param name="noteTextExpression">The expression used to extract the point note text from the chart model.</param>
        public ChartAreaSeries(Expression<Func<TModel, TValue>> expression, Expression<Func<TModel, TCategory>> categoryExpression, Expression<Func<TModel, string>> noteTextExpression)
            : base(expression, categoryExpression, noteTextExpression)
        {            
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartAreaSeries{TModel, TValue, TCategory}" /> class.
        /// </summary>
        /// <param name="data">The data to bind to.</param>
        public ChartAreaSeries(IEnumerable data)
            : base(data)
        {            
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartAreaSeries{TModel, TValue, TCategory}" /> class.
        /// </summary>
        public ChartAreaSeries()
            : base()
        {            
        }

        /// <summary>
        /// The area chart line configuration.
        /// </summary>
        public ChartAreaLine Line
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
            return new ChartAreaSeriesSerializer(this);
        }

        protected override void Initialize()
        {
            base.Initialize();
            Line = new ChartAreaLine();
            ErrorBars = new CategoricalErrorBars();
        }
    }

    public class ChartAreaSeries<TModel, TValue> : ChartAreaSeries<TModel, TValue, string> where TModel : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartAreaSeries{TModel, TValue}" /> class.
        /// </summary>
        /// <param name="expression">The expression used to extract the point value from the chart model.</param>
        public ChartAreaSeries(Expression<Func<TModel, TValue>> expression)
            : base(expression, null, null)
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartAreaSeries{TModel, TValue}" /> class.
        /// </summary>
        /// <param name="data">The data to bind to.</param>
        public ChartAreaSeries(IEnumerable data)
            : base(data)
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartAreaSeries{TModel, TValue}" /> class.
        /// </summary>
        public ChartAreaSeries()
        {
        }
    }
}