namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections;

    /// <summary>
    /// Represents a category axis
    /// </summary>
    public interface IChartCategoryAxis : IChartAxis
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
