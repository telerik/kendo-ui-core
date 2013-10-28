namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq.Expressions;
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.Resources;
    using System.Collections;

    public class ChartFunnelSeries<TModel, TValue> : ChartSeriesBase<TModel>, IChartFunnelSeries where TModel : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartFunnelSeries{TModel, TValue}" /> class.
        /// </summary>
        /// <param name="expressionValue">The value expression.</param>
        /// <param name="expressionCategory">The category expression.</param>
        /// <param name="expressionColor">The color expression.</param>
        /// <param name="expressionExplode">The explode expression.</param>
        /// <param name="expressionVisibleInLegend">The visibleInLegend expression.</param>
        public ChartFunnelSeries(
            Expression<Func<TModel, TValue>> expressionValue,
            Expression<Func<TModel, string>> expressionCategory,
            Expression<Func<TModel,string>> expressionColor,
            Expression<Func<TModel, bool>> expressionVisibleInLegend)
            : base()
        {
            if (typeof(TModel).IsPlainType() && !expressionValue.IsBindable())
            {
                throw new InvalidOperationException(Exceptions.MemberExpressionRequired);
            }

            Member = expressionValue.MemberWithoutInstance();

            if (expressionCategory != null)
            {
                Category = expressionCategory.Compile();
                CategoryMember = expressionCategory.MemberWithoutInstance();
            }

            if (expressionColor != null)
            {
                Color = expressionColor.Compile();
                ColorMember = expressionColor.MemberWithoutInstance();
            }

            if (string.IsNullOrEmpty(Name))
            {
                Name = Member.AsTitle();
            }

            Initialize();
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartFunnelSeries{TModel, TValue}" /> class.
        /// </summary>
        /// <param name="data">The data.</param>
        public ChartFunnelSeries(IEnumerable data)
            : base()
        {
            Data = data;
            Initialize();
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartFunnelSeries{TModel, TValue}" /> class.
        /// </summary>
        public ChartFunnelSeries()
            : base()
        {
            Initialize();
        }

        /// <summary>
        /// Gets the series type.
        /// </summary>
        public string Type
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

        /// <summary>
        /// Gets the model data category member name.
        /// </summary>
        /// <value>The model data category member name.</value>
        public string CategoryMember
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the model data color member name.
        /// </summary>
        /// <value>The model data color member name.</value>
        public string ColorMember
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the model data visibleInLegend member name.
        /// </summary>
        /// <value>The model data visibleInLegend member name.</value>
        public string VisibleInLegendMember
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the model data note text member name.
        /// </summary>
        /// <value>The model data note text member name.</value>
        public string NoteTextMember
        {
            get;
            set;
        }

        /// <summary>
        /// Gets a function which returns the category of the property to which the column is bound to.
        /// </summary>
        public Func<TModel, string> Category
        {
            get;
            private set;
        }

        /// <summary>
        /// Gets a function which returns the visibleInLegend of the property to which the column is bound to.
        /// </summary>
        public Func<TModel, bool> VisibleInLegend
        {
            get;
            private set;
        }

        /// <summary>
        /// Gets a function which returns the color of the property to which the column is bound to.
        /// </summary>
        public new Func<TModel, string> Color
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the funnel chart data labels configuration
        /// </summary>
        public ChartFunnelLabels Labels
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the funnel border
        /// </summary>
        public ChartElementBorder Border
        {
            get;
            set;
        }

        /// <summary>
        /// The funnel chart data configuration.
        /// </summary>
        public IEnumerable Data
        {
            get;
            set;
        }

        /// <summary>
        /// Get or set the funnel chart NeckRatio option
        /// </summary>
        public double NeckRatio
        {
            get;
            set;
        }

        /// <summary>
        /// Get or set the funnel chart DynamicSlope option
        /// </summary>
        public bool DynamicSlope
        {
            get;
            set;
        }

        /// <summary>
        /// Get or set the funnel chart DynamicHeight option
        /// </summary>
        public bool DynamicHeight
        {
            get;
            set;
        }

        /// <summary>
        /// Get or set the funnel chart SegmentSpacing option
        /// </summary>
        public double SegmentSpacing
        {
            get;
            set;
        }

        private void Initialize()
        {
            Labels = new ChartFunnelLabels();
            Border = new ChartElementBorder();
            DynamicHeight = true;
            NeckRatio = 0.3;
            Type = "funnel";
        }

        public override IChartSerializer CreateSerializer()
        {
            return new ChartFunnelSeriesSerializer(this);
        }


    }
}