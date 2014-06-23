namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="PivotDataSourceMeasure"/>.
    /// </summary>
    public class PivotDataSourceMeasureBuilder : IHideObjectMembers
    {
         private readonly PivotDataSourceMeasure measure;

        /// <summary>
        /// Initializes a new instance of the <see cref="PivotDataSourceMeasureBuilder"/> class.
        /// </summary>
        /// <param name="measure">The column</param>
        public PivotDataSourceMeasureBuilder(PivotDataSourceMeasure measure)
        {
            this.measure = measure;
        }

        /// <summary>
        /// Sets measure values.
        /// </summary>
        /// <param name="values">The measure values</param>
        public PivotDataSourceMeasureBuilder Values(string[] values)
        {
            measure.Values = values;

            return this;
        }

        /// <summary>
        /// Sets the axis of the measures.
        /// </summary>
        /// <param name="axis">The axis</param>
        public PivotDataSourceMeasureBuilder Axis(PivotDataSourceMeasureAxis axis)
        {
            measure.Axis = axis;

            return this;
        }
    }
}
