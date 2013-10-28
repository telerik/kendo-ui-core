using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace Kendo.Mvc.UI
{
    public abstract class ChartScatterLineSeriesBase<TModel, TXValue, TYValue>
        : ChartScatterSeriesBase<TModel, TXValue, TYValue>, IScatterLineSeries
        where TModel : class
    {
                /// <summary>
        /// Initializes a new instance of the <see cref="ChartScatterLineSeriesBase{TModel, TXValue, TYValue}" /> class.
        /// </summary>
        /// <param name="xValueExpression">The X expression.</param>
        /// <param name="yValueExpression">The Y expression.</param>
        /// <param name="noteTextExpression">The note text expression.</param>
        public ChartScatterLineSeriesBase(
            Expression<Func<TModel, TXValue>> xValueExpression,
            Expression<Func<TModel, TYValue>> yValueExpression,
            Expression<Func<TModel, string>> noteTextExpression)
            : base(xValueExpression, yValueExpression, noteTextExpression)
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartScatterLineSeriesBase{TModel, TXValue, TYValue}" /> class.
        /// </summary>
        /// <param name="data">The data.</param>
        public ChartScatterLineSeriesBase(IEnumerable data)
            : base(data)
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartScatterLineSeriesBase{TModel, TXValue, TYValue}" /> class.
        /// </summary>
        public ChartScatterLineSeriesBase()
            : base()
        {
        }

        /// <summary>
        /// The chart line width.
        /// </summary>
        public double? Width
        {
            get;
            set;
        }

        /// <summary>
        /// The chart line dashType.
        /// </summary>
        public ChartDashType? DashType
        {
            get;
            set;
        }

        /// <summary>
        /// The behavior for handling missing values in scatter line series.
        /// </summary>
        public ChartScatterLineMissingValues? MissingValues
        {
            get;
            set;
        }
    }
}
