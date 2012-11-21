namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq.Expressions;
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.Resources;
    using System.Collections;

    public class ChartOHLCSeries<TModel, TValue> : ChartSeriesBase<TModel>, IChartOHLCSeries where TModel : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartOHLCSeries{TModel, TValue}" /> class.
        /// </summary>
        /// <param name="openExpression">The open expression.</param>
        /// <param name="highExpression">The high expression.</param>
        /// <param name="lowExpression">The low expression.</param>
        /// <param name="closeExpression">The close expression.</param>
        /// <param name="colorExpression">The color expression.</param>
        public ChartOHLCSeries(
            Expression<Func<TModel, TValue>> openExpression,
            Expression<Func<TModel, TValue>> highExpression,
            Expression<Func<TModel, TValue>> lowExpression,
            Expression<Func<TModel, TValue>> closeExpression,
            Expression<Func<TModel, string>> colorExpression
            )
            : base()
        {
            if (typeof(TModel).IsPlainType() && !openExpression.IsBindable() && !highExpression.IsBindable() && !lowExpression.IsBindable() && !closeExpression.IsBindable())
            {
                throw new InvalidOperationException(Exceptions.MemberExpressionRequired);
            }

            OpenMember = openExpression.MemberWithoutInstance();
            HighMember = highExpression.MemberWithoutInstance();
            LowMember = lowExpression.MemberWithoutInstance();
            CloseMember = closeExpression.MemberWithoutInstance();

            if (colorExpression != null)
            {
                ColorMember = colorExpression.MemberWithoutInstance();
            }

            Initialize();
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartOHLCSeries{TModel, TValue}" /> class.
        /// </summary>
        /// <param name="data">The data.</param>
        public ChartOHLCSeries(IEnumerable data)
            : base()
        {
            Data = data;
            Initialize();
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartOHLCSeries{TModel, TValue}" /> class.
        /// </summary>
        public ChartOHLCSeries()
            : base()
        {
            Initialize();
        }

        /// <summary>
        /// Gets the series type.
        /// </summary>
        public string Type { get; set; }

        /// <summary>
        /// Gets the model data open member name.
        /// </summary>
        /// <value>The model data open member name.</value>
        public string OpenMember { get; set; }

        /// <summary>
        /// Gets the model data high member name.
        /// </summary>
        /// <value>The model data high member name.</value>
        public string HighMember { get; set; }

        /// <summary>
        /// Gets the model data low member name.
        /// </summary>
        /// <value>The model data low member name.</value>
        public string LowMember { get; set; }

        /// <summary>
        /// Gets the model data close member name.
        /// </summary>
        /// <value>The model data close member name.</value>
        public string CloseMember { get; set; }

        /// <summary>
        /// Gets the model data color member name.
        /// </summary>
        /// <value>The model data color member name.</value>
        public string ColorMember { get; set; }

        /// <summary>
        /// Gets or sets the point border
        /// </summary>
        public ChartElementBorder Border { get; set; }

        /// <summary>
        /// The ohlc chart data configuration.
        /// </summary>
        public IEnumerable Data { get; set; }

        /// <summary>
        /// Aggregates function for date series.
        /// </summary>
        public ChartOHLCAggregates Aggregates { get; set; }

        /// <summary>
        /// The distance between category clusters.
        /// </summary>
        /// <value>
        /// A value of 1 means that there is a total of 1 point width between categories. 
        /// The distance is distributed evenly on each side.
        /// </value>
        public double? Gap { get; set; }

        /// <summary>
        /// Space between points.
        /// </summary>
        /// <value>
        /// Value of 1 means that the distance between points is equal to their width.
        /// </value>
        public double? Spacing { get; set; }

        /// <summary>
        /// The ohlc chart line configuration.
        /// </summary>
        public ChartLine Line
        {
            get;
            set;
        }

        private void Initialize()
        {
            Border = new ChartElementBorder();
            Line = new ChartLine();
            Type = "ohlc";
            Aggregates = new ChartOHLCAggregates();
        }

        public override IChartSerializer CreateSerializer()
        {
            return new ChartOHLCSeriesSerializer(this);
        }
    }
}