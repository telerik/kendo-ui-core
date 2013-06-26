namespace Kendo.Mvc.UI
{
    using System.Collections;

    public interface IChartScatterSeries : IChartSeries
    {
        /// <summary>
        /// Gets the X data member of the series.
        /// </summary>
        string XMember
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the Y data member of the series.
        /// </summary>
        string YMember
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the note text member of the series.
        /// </summary>
        string NoteTextMember
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the scatter chart data labels configuration
        /// </summary>
        ChartPointLabels Labels
        {
            get;
            set;
        }

        /// <summary>
        /// The scatter chart markers configuration.
        /// </summary>
        ChartMarkers Markers
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the X axis name to use for this series.
        /// </summary>
        string XAxis
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the Y axis name to use for this series.
        /// </summary>
        string YAxis
        {
            get;
            set;
        }

        /// <summary>
        /// The data used for binding.
        /// </summary>
        IEnumerable Data
        {
            get;
            set;
        }
    }
}