namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq.Expressions;
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.Resources;
    using System.Collections;

    public class ChartBubbleSeries<TModel, TXValue, TYValue, TSizeValue> : ChartScatterSeries<TModel, TXValue, TYValue>, IChartBubbleSeries where TModel : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartBubbleSeries{TModel, TXValue, TYValue, TSizeValue}" /> class.
        /// </summary>
        /// <param name="xValueExpression">The X expression.</param>
        /// <param name="yValueExpression">The Y expression.</param>
        /// <param name="sizeExpression">The Size expression.</param>
        /// <param name="categoryExpression">The Category expression.</param>
        /// <param name="colorExpression">The Color expression.</param>
        /// <param name="visibleInLegendExpression">The VisibleInLegend expression.</param>
        public ChartBubbleSeries(
            Expression<Func<TModel, TXValue>> xValueExpression,
            Expression<Func<TModel, TYValue>> yValueExpression,
            Expression<Func<TModel, TSizeValue>> sizeExpression,
            Expression<Func<TModel, string>> categoryExpression,
            Expression<Func<TModel, string>> colorExpression,
            Expression<Func<TModel, bool>> visibleInLegendExpression)
            : base(xValueExpression, yValueExpression)
        {
            if (typeof(TModel).IsPlainType() && !sizeExpression.IsBindable())
            {
                throw new InvalidOperationException(Exceptions.MemberExpressionRequired);
            }

            SizeMember = sizeExpression.MemberWithoutInstance();

            if (categoryExpression != null)
            {
                CategoryMember = categoryExpression.MemberWithoutInstance();
            }

            if (colorExpression != null)
            {
                ColorMember = colorExpression.MemberWithoutInstance();
            }

            if (visibleInLegendExpression != null)
            {
                VisibleInLegendMember = visibleInLegendExpression.MemberWithoutInstance();
            }
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartBubbleSeries{TModel, TXValue, TYValue, TSizeValue}" /> class.
        /// </summary>
        /// <param name="data">The data.</param>
        public ChartBubbleSeries(IEnumerable data)
            : base(data)
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartBubbleSeries{TModel, TXValue, TYValue, TSizeValue}" /> class.
        /// </summary>
        public ChartBubbleSeries()
            : base()
        {
        }

        /// <summary>
        /// Gets the Size data member of the series.
        /// </summary>
        public string SizeMember
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the Category data member of the series.
        /// </summary>
        public string CategoryMember
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the Color data member of the series.
        /// </summary>
        public string ColorMember
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the VisibleInLegend data member of the series.
        /// </summary>
        public string VisibleInLegendMember
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the minimum bubble size of the series.
        /// </summary>
        public int? MinSize
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the maximum bubble size of the series.
        /// </summary>
        public int? MaxSize
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the negative value bubbles options.
        /// </summary>
        public ChartNegativeValueSettings NegativeValues
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the bubble border.
        /// </summary>
        public ChartElementBorder Border
        {
            get;
            set;
        }

        protected override void Initialize()
        {
            base.Initialize();

            NegativeValues = new ChartNegativeValueSettings();
            Border = new ChartElementBorder();
        }

        public override IChartSerializer CreateSerializer()
        {
            return new ChartBubbleSeriesSerializer(this);
        }
    }
}