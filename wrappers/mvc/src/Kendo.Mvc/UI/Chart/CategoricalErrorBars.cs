namespace Kendo.Mvc.UI
{
    public class CategoricalErrorBars : ErrorBarsBase
    {
        /// <summary>
        /// Gets or sets the error bars value.
        /// </summary>
        public object Value
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the model data error low member name.
        /// </summary>
        /// <value>The model data error low member name.</value>
        public string LowMember
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the model data error high member name.
        /// </summary>
        /// <value>The model data error high member name.</value>
        public string HighMember
        {
            get;
            set;
        }

        public override IChartSerializer CreateSerializer()
        {
            return new CategoricalErrorBarsSerializer(this);
        }
    }
}
