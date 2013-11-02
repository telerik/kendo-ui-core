namespace Kendo.Mvc.UI
{
    public interface IScatterErrorBarsSeries
    {
        /// <summary>
        /// The scatter chart error bars configuration.
        /// </summary>
        ScatterErrorBars ErrorBars
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the model data x axis error low member name.
        /// </summary>
        /// <value>The model data x axis error low member name.</value>
        string XErrorLowMember
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the model data x axis error high member name.
        /// </summary>
        /// <value>The model data x axis error high member name.</value>
        string XErrorHighMember
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the model data y axis error low member name.
        /// </summary>
        /// <value>The model data y axis error low member name.</value>
        string YErrorLowMember
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the model data y axis error high member name.
        /// </summary>
        /// <value>The model data y axis error high member name.</value>
        string YErrorHighMember
        {
            get;
            set;
        }

    }
}
