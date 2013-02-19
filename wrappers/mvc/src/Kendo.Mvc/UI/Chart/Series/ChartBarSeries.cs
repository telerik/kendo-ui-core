namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections;
    using System.Linq.Expressions;
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.Resources;

    public class ChartBarSeries<TModel, TValue> : ChartBoundSeries<TModel, TValue>, IChartBarSeries where TModel : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartBarSeries{TModel, TValue}"/> class.
        /// </summary>
        /// <param name="valueExpression">The expression used to extract the point value from the chart model.</param>
        /// <param name="colorExpression">The expression used to extract the point color from the chart model.</param>
        public ChartBarSeries(Expression<Func<TModel, TValue>> valueExpression, Expression<Func<TModel, string>> colorExpression)
            : base(valueExpression)
        {
            if (colorExpression != null) {
                if (typeof(TModel).IsPlainType() && !colorExpression.IsBindable())
                {
                    throw new InvalidOperationException(Exceptions.MemberExpressionRequired);
                }

                ColorMember = colorExpression.MemberWithoutInstance();
            }

            Initialize();
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartBarSeries{TModel, TValue}"/> class.
        /// </summary>
        /// <param name="data">The data to bind to.</param>
        public ChartBarSeries(IEnumerable data)
            : base(data)
        {
            Initialize();
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartBarSeries{TModel, TValue}" /> class.
        /// </summary>
        public ChartBarSeries()
        {
            Initialize();
        }

        /// <summary>
        /// A value indicating if the bars should be stacked.
        /// </summary>
        public bool Stacked
        {
            get;
            set;
        }

        /// <summary>
        /// Aggregate function for date series.
        /// </summary>
        public ChartSeriesAggregate? Aggregate
        {
            get;
            set;
        }

        /// <summary>
        /// The stack name that this series belongs to.
        /// </summary>
        public string StackName
        {
            get;
            set;
        }

        /// <summary>
        /// The distance between category clusters.
        /// </summary>
        /// <value>
        /// A value of 1 means that there is a total of 1 column width / bar height between categories. 
        /// The distance is distributed evenly on each side.
        /// </value>
        public double? Gap
        {
            get;
            set;
        }

        /// <summary>
        /// Space between bars.
        /// </summary>
        /// <value>
        /// Value of 1 means that the distance between bars is equal to their width.
        /// </value>
        public double? Spacing
        {
            get;
            set;
        }

        /// <summary>
        /// The orientation of the bars.
        /// </summary>
        /// <value>
        /// Can be either <see cref="ChartSeriesOrientation.Horizontal">horizontal</see> (bar chart)
        /// or <see cref="ChartSeriesOrientation.Vertical">vertical</see> (column chart).
        /// The default value is horizontal.
        /// </value>
        public ChartSeriesOrientation Orientation
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the bar chart data labels configuration
        /// </summary>
        /// <returns></returns>
        public ChartBarLabels Labels
        {
            get;
            private set;
        }

        /// <summary>
        /// Gets or sets the bar border
        /// </summary>
        public ChartElementBorder Border
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the effects overlay
        /// </summary>
        public ChartBarSeriesOverlay Overlay
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the model color member name.
        /// </summary>
        /// <value>The model color member name.</value>
        public string ColorMember
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the series color for negative values
        /// </summary>
        public string NegativeColor
        {
            get;
            set;
        }

        public override IChartSerializer CreateSerializer()
        {
            return new ChartBarSeriesSerializer(this);
        }

        private void Initialize()
        {
            Orientation = ChartSeriesOrientation.Horizontal;
            Stacked = false;
            Labels = new ChartBarLabels();
            Border = new ChartElementBorder();
        }
    }
}