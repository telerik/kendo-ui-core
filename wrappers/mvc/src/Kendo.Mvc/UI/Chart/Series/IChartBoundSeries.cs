namespace Kendo.Mvc.UI
{
    using System.Collections;

    public interface IChartBoundSeries : IChartSeries
    {
        /// <summary>
        /// Gets the data member of the series.
        /// </summary>
        string Member
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the model data category member name.
        /// </summary>
        /// <value>The model data category member name.</value>
        string CategoryMember
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the model data note text member name.
        /// </summary>
        /// <value>The model data note text member name.</value>
        string NoteTextMember
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