namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections;
    using System.Collections.Generic;

    /// <summary>
    /// Represents a category axis in the <see cref="Chart{T}"/> component
    /// </summary>
    /// <typeparam name="T">The type of the data item</typeparam>
    public class ChartCategoryAxis<T> : ChartAxisBase<T, int>, IChartCategoryAxis where T : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartCategoryAxis{T}" /> class.
        /// </summary>
        /// <param name="chart">The chart.</param>
        public ChartCategoryAxis(Chart<T> chart)
            : base(chart)
        {
            Labels = new ChartAxisLabels();
            MajorGridLines = new ChartLine();
            MinorGridLines = new ChartLine();
            AxisCrossingValues = new List<double>();
        }

        /// <summary>
        /// The values at which perpendicular axes cross this axis.
        /// </summary>
        public IEnumerable<double> AxisCrossingValues
        {
            get;
            set;
        }

        /// <summary>
        /// The categories displayed on the axis
        /// </summary>
        public IEnumerable Categories
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the member name to be used as category.
        /// </summary>
        /// <value>The member.</value>
        public string Member
        {
            get;
            set;
        }

        /// <summary>
        /// Specifies the category axis type.
        /// </summary>
        public ChartCategoryAxisType? Type
        {
            get;
            set;
        }

        /// <summary>
        /// Specifies the date category axis base unit.
        /// </summary>
        public ChartAxisBaseUnit? BaseUnit
        {
            get;
            set;
        }

        /// <summary>
        /// Specifies the date category axis minimum (start) date.
        /// </summary>
        public DateTime? Min
        {
            get;
            set;
        }

        /// <summary>
        /// Specifies the date category axis maximum (end) date.
        /// </summary>
        public DateTime? Max
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the axis serializer.
        /// </summary>
        public override IChartSerializer CreateSerializer()
        {
            return new ChartCategoryAxisSerializer(this);
        }
    }
}