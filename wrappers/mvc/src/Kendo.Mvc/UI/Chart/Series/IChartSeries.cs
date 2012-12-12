namespace Kendo.Mvc.UI
{
    public interface IChartSeries
    {
        /// <summary>
        /// The series name.
        /// </summary>
        string Name 
        { 
            get;
            set; 
        }

        /// <summary>
        /// The series opacity
        /// </summary>
        double? Opacity
        {
            get;
            set;
        }

        /// <summary>
        /// The series base color
        /// </summary>
        string Color
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the data point tooltip options
        /// </summary>
        ChartTooltip Tooltip
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the axis name to use for this series.
        /// </summary>
        string Axis
        {
            get;
            set;
        }

        /// <summary>
        /// Name template for auto-generated series when binding to grouped data.
        /// </summary>
        string GroupNameTemplate
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the series highlight options
        /// </summary>
        ChartSeriesHighlight Highlight
        {
            get;
            set;
        }
        
        IChartSerializer CreateSerializer();
    }
}