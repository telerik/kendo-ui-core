namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections;
    using System.Linq.Expressions;
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.Resources;

    public class ChartBarSeries<TModel, TValue, TCategory> : ChartBarSeriesBase<TModel, TValue, TCategory>, IChartBarSeries where TModel : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartBarSeries{TModel, TValue, TCategory}"/> class.
        /// </summary>
        /// <param name="expression">The expression used to extract the point value from the chart model.</param>
        /// <param name="colorExpression">The expression used to extract the point color from the chart model.</param>
        /// <param name="categoryExpression">The expression used to extract the point category from the chart model.</param>
        /// <param name="noteTextExpression">The expression used to extract the point note text from the chart model.</param>
        public ChartBarSeries(
            Expression<Func<TModel, TValue>> expression,
            Expression<Func<TModel, string>> colorExpression,
            Expression<Func<TModel, TCategory>> categoryExpression,
            Expression<Func<TModel, string>> noteTextExpression)
            : base(expression,colorExpression, categoryExpression, noteTextExpression)
        {
            if (colorExpression != null) {
                if (typeof(TModel).IsPlainType() && !colorExpression.IsBindable())
                {
                    throw new InvalidOperationException(Exceptions.MemberExpressionRequired);
                }

                ColorMember = colorExpression.MemberWithoutInstance();
            }            
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartBarSeries{TModel, TValue, TCategory}"/> class.
        /// </summary>
        /// <param name="data">The data to bind to.</param>
        public ChartBarSeries(IEnumerable data)
            : base(data)
        {            
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartBarSeries{TModel, TValue, TCategory}" /> class.
        /// </summary>
        public ChartBarSeries(): base()
        {            
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
            return new ChartBarSeriesSerializer(this);
        }

        protected override void Initialize()
        {
            base.Initialize();
            ErrorBars = new CategoricalErrorBars();
        }
    }

    public class ChartBarSeries<TModel, TValue> : ChartBarSeries<TModel, TValue, string> where TModel : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartBarSeries{TModel, TValue}" /> class.
        /// </summary>
        /// <param name="expression">The expression used to extract the point value from the chart model.</param>
        /// <param name="colorExpression">The expression used to extract the point color from the chart model.</param>
        public ChartBarSeries(Expression<Func<TModel, TValue>> expression, Expression<Func<TModel, string>> colorExpression)
            : base(expression, colorExpression, null, null)
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartBarSeries{TModel, TValue}" /> class.
        /// </summary>
        /// <param name="data">The data to bind to.</param>
        public ChartBarSeries(IEnumerable data)
            : base(data)
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartBarSeries{TModel, TValue}" /> class.
        /// </summary>
        public ChartBarSeries()
        {
        }
    }
}