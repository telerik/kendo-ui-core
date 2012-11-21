namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections;
    using System.Collections.Generic;

    public interface IChartCategoryAxis : IChartAxis<int>
    {
        /// <summary>
        /// The categories displayed on the axis
        /// </summary>
        IEnumerable Categories
        { 
            get; 
            set; 
        }

        /// <summary>
        /// The Model member used to populate the <see cref="Categories" />
        /// </summary>
        string Member
        {
            get;
            set;
        }

        /// <summary>
        /// The category indicies at which perpendicular axes cross this axis.
        /// </summary>
        IEnumerable<double> AxisCrossingValues { get; set; }

        /// <summary>
        /// Specifies the category axis type.
        /// </summary>
        ChartCategoryAxisType? Type
        {
            get;
            set;
        }

        /// <summary>
        /// Specifies the date category axis base unit.
        /// </summary>
        ChartAxisBaseUnit? BaseUnit
        {
            get;
            set;
        }

        /// <summary>
        /// Sets the step (interval) between categories in base units.
        /// </summary>
        int? BaseUnitStep
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
        bool? RoundToBaseUnit
        {
            get;
            set;
        }

        /// <summary>
        /// Positions categories and series points on major ticks. This removes the empty space before and after the series.
        /// This option will be ignored if either Bar, Column, OHLC or Candlestick series are plotted on the axis.
        /// </summary>
        bool? Justified
        {
            get;
            set;
        }

        /// <summary>
        /// Specifies the discrete BaseUnitStep values
        /// when either BaseUnit is set to Fit or BaseUnitStep is set to Auto.
        /// </summary>
        ChartAxisBaseUnitSteps AutoBaseUnitSteps
        {
            get;
            set;
        }

        /// <summary>
        /// Specifies the date category axis minimum (start) date.
        /// </summary>
        DateTime? Min
        {
            get;
            set;
        }

        /// <summary>
        /// Specifies the date category axis maximum (end) date.
        /// </summary>
        DateTime? Max
        {
            get;
            set;
        }
    }
}
