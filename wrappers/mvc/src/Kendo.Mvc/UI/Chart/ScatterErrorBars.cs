namespace Kendo.Mvc.UI
{
    public class ScatterErrorBars : ErrorBarsBase
    {
        /// <summary>
        /// Gets or sets the error bars X value.
        /// </summary>
        public object XValue 
        { 
            get; 
            set;
        }

        /// <summary>
        /// Gets or sets the error bars Y value.
        /// </summary>
        public object YValue
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the model data x axis error low member name.
        /// </summary>
        /// <value>The model data x axis error low member name.</value>
        public string XLowMember
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the model data x axis error high member name.
        /// </summary>
        /// <value>The model data x axis error high member name.</value>
        public string XHighMember
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the model data y axis error low member name.
        /// </summary>
        /// <value>The model data y axis error low member name.</value>
        public string YLowMember
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the model data y axis error high member name.
        /// </summary>
        /// <value>The model data y axis error high member name.</value>
        public string YHighMember
        {
            get;
            set;
        }

        public override IChartSerializer CreateSerializer()
        {
            return new ScatterErrorBarsSerializer(this);
        }
    }
}
