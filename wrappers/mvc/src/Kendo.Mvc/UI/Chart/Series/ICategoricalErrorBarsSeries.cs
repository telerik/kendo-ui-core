namespace Kendo.Mvc.UI
{
    public interface ICategoricalErrorBarsSeries
    {

        /// <summary>
        /// Gets or sets the series error bars options
        /// </summary>
        CategoricalErrorBars ErrorBars
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the model data error low member name.
        /// </summary>
        /// <value>The model data error low member name.</value>
        string ErrorLowMember
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the model data error high member name.
        /// </summary>
        /// <value>The model data error high member name.</value>
        string ErrorHighMember
        {
            get;
            set;
        }
    }
}
