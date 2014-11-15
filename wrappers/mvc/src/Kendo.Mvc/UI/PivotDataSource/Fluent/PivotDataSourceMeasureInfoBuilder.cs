namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="PivotDataSourceMeasureInfo"/>.
    /// </summary>
    public class PivotDataSourceMeasureInfoBuilder : IHideObjectMembers
    {
        private readonly PivotDataSourceMeasureInfo measure;

        /// <summary>
        /// Initializes a new instance of the <see cref="PivotDataSourceMeasureInfoBuilder"/> class.
        /// </summary>
        /// <param name="measure">The column</param>
        public PivotDataSourceMeasureInfoBuilder(PivotDataSourceMeasureInfo measure)
        {
            this.measure = measure;
        }

        /// <summary>
        /// Sets measure name.
        /// </summary>
        /// <param name="values">The measure name</param>
        public PivotDataSourceMeasureInfoBuilder Name(string name)
        {
            measure.Name = name;

            return this;
        }

        /// <summary>
        /// Sets measure type.
        /// </summary>
        /// <param name="values">The measure type</param>
        public PivotDataSourceMeasureInfoBuilder Type(string type)
        {
            measure.Type = type;

            return this;
        }
    }
}
