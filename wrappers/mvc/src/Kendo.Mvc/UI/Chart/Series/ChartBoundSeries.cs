namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections;
    using System.Linq.Expressions;
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.Resources;

    public abstract class ChartBoundSeries<TModel, TValue> : ChartSeriesBase<TModel>, IChartBoundSeries where TModel : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartBoundSeries{TModel, TValue}" /> class.
        /// </summary>
        /// <param name="chart">The chart.</param>
        /// <param name="expression">The expression.</param>
        protected ChartBoundSeries(Expression<Func<TModel, TValue>> expression)
        {
            if (typeof(TModel).IsPlainType() && !expression.IsBindable())
            {
                throw new InvalidOperationException(Exceptions.MemberExpressionRequired);
            }

            Member = expression.MemberWithoutInstance();

            if (string.IsNullOrEmpty(Name))
            {
                Name = Member.AsTitle();
            }
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartBoundSeries{TModel, TValue}" /> class.
        /// </summary>
        /// <param name="chart">The chart.</param>
        /// <param name="data">The data.</param>
        protected ChartBoundSeries(IEnumerable data)
        {
            Data = data;
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartBoundSeries{TModel, TValue}" /> class.
        /// </summary>
        /// <param name="chart">The chart.</param>
        protected ChartBoundSeries()
        {
        }

        /// <summary>
        /// The data used for binding.
        /// </summary>
        public IEnumerable Data
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the model data member name.
        /// </summary>
        /// <value>The model data member name.</value>
        public string Member
        {
            get;
            set;
        }
    }
}
