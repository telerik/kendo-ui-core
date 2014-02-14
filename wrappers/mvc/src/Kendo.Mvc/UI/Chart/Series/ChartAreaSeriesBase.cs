using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace Kendo.Mvc.UI
{
    public abstract class ChartAreaSeriesBase<TModel, TValue, TCategory> : ChartBoundSeries<TModel, TValue, TCategory>, IAreaSeries where TModel : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartAreaSeriesBase{TModel, TValue, TCategory}" /> class.
        /// </summary>
        /// <param name="expression">The expression used to extract the point value from the chart model.</param>
        /// <param name="categoryExpression">The expression used to extract the point category from the chart model.</param>
        /// <param name="noteTextExpression">The expression used to extract the point note text from the chart model.</param>
        public ChartAreaSeriesBase(Expression<Func<TModel, TValue>> expression, Expression<Func<TModel, TCategory>> categoryExpression, Expression<Func<TModel, string>> noteTextExpression)
            : base(expression, categoryExpression, noteTextExpression)
        {
            Initialize();
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartAreaSeriesBase{TModel, TValue, TCategory}" /> class.
        /// </summary>
        /// <param name="data">The data to bind to.</param>
        public ChartAreaSeriesBase(IEnumerable data)
            : base(data)
        {
            Initialize();
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartAreaSeriesBase{TModel, TValue, TCategory}" /> class.
        /// </summary>
        public ChartAreaSeriesBase()
            : base()
        {
            Initialize();
        }

        /// <summary>
        /// A value indicating if the areas should be stacked.
        /// </summary>
        public bool? Stacked
        {
            get;
            set;
        }

        /// <summary>
        /// The type of stack to plot
        /// </summary>
        public ChartStackType? StackType
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
        /// Gets the area chart data labels configuration.
        /// </summary>
        public ChartPointLabels Labels
        {
            get;
            set;
        }

        /// <summary>
        /// The area chart markers configuration.
        /// </summary>
        public ChartMarkers Markers
        {
            get;
            set;
        }

        /// <summary>
        /// The behavior for handling missing values in area series.
        /// </summary>
        public ChartAreaMissingValues? MissingValues
        {
            get;
            set;
        }

        /// <summary>
        /// The orientation of the area chart.
        /// </summary>
        /// <value>
        /// Can be either <see cref="ChartSeriesOrientation.Horizontal">horizontal</see>
        /// or <see cref="ChartSeriesOrientation.Vertical">vertical</see>.
        /// The default value is horizontal.
        /// </value>
        public ChartSeriesOrientation Orientation
        {
            get;
            set;
        }

        protected virtual void Initialize()
        {
            Labels = new ChartPointLabels();
            Markers = new ChartMarkers();            
            Orientation = ChartSeriesOrientation.Horizontal;                        
        }
    }
}
