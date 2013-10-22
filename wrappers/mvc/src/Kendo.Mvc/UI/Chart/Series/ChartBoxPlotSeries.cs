namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq.Expressions;
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.Resources;
    using System.Collections;
using System.Collections.Generic;

    public class ChartBoxPlotSeries<TModel, TValue, TCategory> : ChartSeriesBase<TModel>, IChartBoxPlotSeries where TModel : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartBoxPlotSeries{TModel, TValue}" /> class.
        /// </summary>
        /// <param name="lowerExpression">The lower expression.</param>
        /// <param name="q1Expression">The q1 expression.</param>
        /// <param name="medianExpression">The median expression.</param>
        /// <param name="q3Expression">The q3 expression.</param>
        /// <param name="upperExpression">The upper expression.</param>
        /// <param name="meanExpression">The mean expression.</param>
        /// <param name="outliersExpression">The outliers expression.</param>
        /// <param name="categoryExpression">The expression used to extract the point category from the chart model.</param>
        /// <param name="colorExpression">The color expression.</param>
        public ChartBoxPlotSeries(
            Expression<Func<TModel, TValue>> lowerExpression,
            Expression<Func<TModel, TValue>> q1Expression,
            Expression<Func<TModel, TValue>> medianExpression,
            Expression<Func<TModel, TValue>> q3Expression,
            Expression<Func<TModel, TValue>> upperExpression,
            Expression<Func<TModel, TValue>> meanExpression,
            Expression<Func<TModel, List<TValue>>> outliersExpression,
            Expression<Func<TModel, string>> colorExpression,
            Expression<Func<TModel, TCategory>> categoryExpression,
            Expression<Func<TModel, string>> noteTextExpression
            )
            : base()
        {
            if (typeof(TModel).IsPlainType() && !lowerExpression.IsBindable() && !q1Expression.IsBindable() && !medianExpression.IsBindable() && !q3Expression.IsBindable() && !upperExpression.IsBindable())
            {
                throw new InvalidOperationException(Exceptions.MemberExpressionRequired);
            }

            LowerMember = lowerExpression.MemberWithoutInstance();
            Q1Member = q1Expression.MemberWithoutInstance();
            MedianMember = medianExpression.MemberWithoutInstance();
            Q3Member = q3Expression.MemberWithoutInstance();
            UpperMember = upperExpression.MemberWithoutInstance();

            if (meanExpression != null)
            {
                MeanMember = meanExpression.MemberWithoutInstance();
            }

            if (outliersExpression != null)
            {
                OutliersMember = outliersExpression.MemberWithoutInstance();
            }

            if (colorExpression != null)
            {
                ColorMember = colorExpression.MemberWithoutInstance();
            }

            if (categoryExpression != null)
            {
                Category = categoryExpression.Compile();
                CategoryMember = categoryExpression.MemberWithoutInstance();
            }

            if (noteTextExpression != null)
            {
                NoteTextMember = noteTextExpression.MemberWithoutInstance();
            }

            Initialize();
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartBoxPlotSeries{TModel, TValue}" /> class.
        /// </summary>
        /// <param name="data">The data.</param>
        public ChartBoxPlotSeries(IEnumerable data)
            : base()
        {
            Data = data;
            Initialize();
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartBoxPlotSeries{TModel, TValue}" /> class.
        /// </summary>
        public ChartBoxPlotSeries()
            : base()
        {
            Initialize();
        }

        /// <summary>
        /// Gets the series type.
        /// </summary>
        public string Type { get; set; }

        /// <summary>
        /// Gets the model lower member name.
        /// </summary>
        /// <value>The model lower member name.</value>
        public string LowerMember { get; set; }

        /// <summary>
        /// Gets the model q1 member name.
        /// </summary>
        /// <value>The model q1 member name.</value>
        public string Q1Member { get; set; }

        /// <summary>
        /// Gets the model median member name.
        /// </summary>
        /// <value>The model median member name.</value>
        public string MedianMember { get; set; }

        /// <summary>
        /// Gets the model model q3 member name.
        /// </summary>
        /// <value>The model q3 member name.</value>
        public string Q3Member { get; set; }

        /// <summary>
        /// Gets the model upper member name.
        /// </summary>
        /// <value>The model upper member name.</value>
        public string UpperMember { get; set; }

        /// <summary>
        /// Gets the model mean member name.
        /// </summary>
        /// <value>The model mean member name.</value>
        public string MeanMember { get; set; }

        /// <summary>
        /// Gets the model outliers member name.
        /// </summary>
        /// <value>The model outliers member name.</value>
        public string OutliersMember { get; set; }

        /// <summary>
        /// Gets or sets outliers.
        /// </summary>
        public ChartMarkers Outliers { get; set; }

        /// <summary>
        /// Gets or sets outliers.
        /// </summary>
        public ChartMarkers Extremes { get; set; }

        /// <summary>
        /// Gets the model data color member name.
        /// </summary>
        /// <value>The model data color member name.</value>
        public string ColorMember { get; set; }

        /// <summary>
        /// Gets the model data category member name.
        /// </summary>
        /// <value>The model data category member name.</value>
        public string CategoryMember { get; set; }

        /// <summary>
        /// Gets a function which returns the category of the property to which the column is bound to.
        /// </summary>
        public Func<TModel, TCategory> Category { get; private set; }

        /// <summary>
        /// Gets the model data note text member name.
        /// </summary>
        /// <value>The model data note text member name.</value>
        public string NoteTextMember { get; set; }

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
        public ChartBoxPlotAggregates Aggregates { get; set; }

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
        public ChartLine Line { get; set; }

        private void Initialize()
        {
            Border = new ChartElementBorder();
            Line = new ChartLine();
            Type = "boxPlot";
            Aggregates = new ChartBoxPlotAggregates();
            Outliers = new ChartMarkers();
            Extremes = new ChartMarkers();
        }

        public override IChartSerializer CreateSerializer()
        {
            return new ChartBoxPlotSeriesSerializer(this);
        }
    }
}