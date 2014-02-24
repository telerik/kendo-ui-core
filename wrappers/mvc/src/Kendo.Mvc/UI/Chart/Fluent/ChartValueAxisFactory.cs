namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.UI;

    /// <summary>
    /// Creates value axis for the <see cref="Chart{TModel}" />.
    /// </summary>
    /// <typeparam name="TModel">The type of the data item to which the chart is bound to</typeparam>
    public class ChartValueAxisFactory<TModel> : IHideObjectMembers
        where TModel : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartValueAxisFactory{TModel}"/> class.
        /// </summary>
        /// <param name="container">The container.</param>
        /// <param name="axes">The chart axes.</param>
        public ChartValueAxisFactory(Chart<TModel> container, IList<IChartValueAxis> axes)
        {

            Container = container;
            Axes = axes;
        }

        protected Chart<TModel> Container
        {
            get;
            private set;
        }

        protected IList<IChartValueAxis> Axes
        {
            get;
            private set;
        }

        /// <summary>
        /// Defines a numeric value axis.
        /// </summary>
        public virtual ChartNumericAxisBuilder Numeric()
        {
            return Numeric("");
        }

        /// <summary>
        /// Defines a numeric value axis.
        /// </summary>
        public virtual ChartNumericAxisBuilder Numeric(string name)
        {
            var numericAxis = new ChartNumericAxis<TModel>(Container);
            numericAxis.Name = name;

            Axes.Add(numericAxis);

            return new ChartNumericAxisBuilder(numericAxis);
        }

        /// <summary>
        /// Defines a logarithmic value axis.
        /// </summary>
        public virtual ChartNumericAxisBuilder Logarithmic()
        {
            return Logarithmic("");
        }

        /// <summary>
        /// Defines a logarithmic value axis.
        /// </summary>
        public virtual ChartNumericAxisBuilder Logarithmic(string name)
        {
            var logarithmicAxis = new ChartLogarithmicAxis<TModel>(Container);
            logarithmicAxis.Name = name;

            Axes.Add(logarithmicAxis);

            return new ChartNumericAxisBuilder(logarithmicAxis);
        }

        /// <summary>
        /// Defines a date value axis.
        /// </summary>
        public virtual ChartDateAxisBuilder Date()
        {
            return Date("");
        }

        /// <summary>
        /// Defines a date value axis.
        /// </summary>
        public virtual ChartDateAxisBuilder Date(string name)
        {
            var dateAxis = new ChartDateAxis<TModel>(Container);
            dateAxis.Name = name;

            Axes.Add(dateAxis);

            return new ChartDateAxisBuilder(dateAxis);
        }
    }
}
