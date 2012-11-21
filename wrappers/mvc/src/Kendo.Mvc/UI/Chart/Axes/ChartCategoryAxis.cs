namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections;
    using System.Collections.Generic;

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
            AutoBaseUnitSteps = new ChartAxisBaseUnitSteps();
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
        /// Sets the step (interval) between categories in base units.
        /// </summary>
        public int? BaseUnitStep
        {
            get;
            set;
        }

        /// <summary>
        /// Specifies the maximum number of groups (categories) to produce when
        /// either BaseUnit is set to Fit or BaseUnitStep is set to 0 (auto).
        /// This option is ignored in all other cases.
        /// </summary>
        public int? MaxDateGroups
        {
            get;
            set;
        }

        /// <summary>
        /// If set to false, the min and max dates will not be rounded off to
        /// the nearest baseUnit. 
        /// This option is most useful in combination with explicit min and max dates.
        /// It will be ignored if either Bar, Column, OHLC or Candlestick series are plotted on the axis.
        /// </summary>
        /// <value>
        /// A boolean value that indicates if the axis range should be rounded to the nearest base unit.
        /// The default value is true.
        /// </value>
        public bool? RoundToBaseUnit
        {
            get;
            set;
        }

        /// <summary>
        /// Positions categories and series points on major ticks. This removes the empty space before and after the series.
        /// This option will be ignored if either Bar, Column, OHLC or Candlestick series are plotted on the axis.
        /// </summary>
        public bool? Justified
        {
            get;
            set;
        }

        /// <summary>
        /// Specifies the discrete BaseUnitStep values
        /// when either BaseUnit is set to Fit or BaseUnitStep is set to 0 (auto).
        /// </summary>
        public ChartAxisBaseUnitSteps AutoBaseUnitSteps
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

        public override IChartSerializer CreateSerializer()
        {
            return new ChartCategoryAxisSerializer(this);
        }
    }
}