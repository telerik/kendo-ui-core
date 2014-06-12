namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections;
    using System.Linq.Expressions;
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.Resources;

    public class ChartWaterfallSeries<TModel, TValue, TCategory> : ChartBarSeriesBase<TModel, TValue, TCategory>, IWaterfallSeries where TModel : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartWaterfallSeries{TModel, TValue, TCategory}"/> class.
        /// </summary>
        /// <param name="expression">The expression used to extract the point value from the chart model.</param>
        /// <param name="categoryExpression">The expression used to extract the point category from the chart model.</param>
        /// <param name="summaryExpression">The expression used to extract the point summary type from the chart model.</param>
        public ChartWaterfallSeries(
            Expression<Func<TModel, TValue>> expression,
            Expression<Func<TModel, TCategory>> categoryExpression,
            Expression<Func<TModel, string>> summaryExpression)
            : base(expression, null, categoryExpression, null)
        {
            if (summaryExpression != null)
            {
                if (typeof(TModel).IsPlainType() && !summaryExpression.IsBindable())
                {
                    throw new InvalidOperationException(Exceptions.MemberExpressionRequired);
                }

                SummaryMember = summaryExpression.MemberWithoutInstance();
            }     
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartWaterfallSeries{TModel, TValue, TCategory}"/> class.
        /// </summary>
        /// <param name="data">The data to bind to.</param>
        public ChartWaterfallSeries(IEnumerable data)
            : base(data)
        {            
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartWaterfallSeries{TModel, TValue, TCategory}" /> class.
        /// </summary>
        public ChartWaterfallSeries(): base()
        {            
        }

        /// <summary>
        /// Gets the model summary type member name.
        /// </summary>
        /// <value>The model summary type member name.</value>
        public string SummaryMember
        {
            get;
            set;
        }

        public override IChartSerializer CreateSerializer()
        {
            return new ChartWaterfallSeriesSerializer(this);
        }
    }

    public class ChartWaterfallSeries<TModel, TValue> : ChartWaterfallSeries<TModel, TValue, string> where TModel : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartWaterfallSeries{TModel, TValue}" /> class.
        /// </summary>
        /// <param name="expression">The expression used to extract the point value from the chart model.</param>
        public ChartWaterfallSeries(Expression<Func<TModel, TValue>> expression)
            : base(expression, null, null)
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartWaterfallSeries{TModel, TValue}" /> class.
        /// </summary>
        /// <param name="data">The data to bind to.</param>
        public ChartWaterfallSeries(IEnumerable data)
            : base(data)
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartWaterfallSeries{TModel, TValue}" /> class.
        /// </summary>
        public ChartWaterfallSeries()
        {
        }
    }
}