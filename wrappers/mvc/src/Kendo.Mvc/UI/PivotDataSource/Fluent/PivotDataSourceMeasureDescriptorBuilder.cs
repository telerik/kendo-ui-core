namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="PivotDataSourceMeasureDescriptor"/>.
    /// </summary>
    public class PivotDataSourceMeasureDescriptorBuilder : IHideObjectMembers
    {
        private readonly PivotDataSourceMeasureDescriptor measure;

        /// <summary>
        /// Initializes a new instance of the <see cref="PivotDataSourceMeasureDescriptorBuilder"/> class.
        /// </summary>
        /// <param name="measure">The column</param>
        public PivotDataSourceMeasureDescriptorBuilder(PivotDataSourceMeasureDescriptor measure)
        {
            this.measure = measure;
        }

        /// <summary>
        /// Sets measure name.
        /// </summary>
        /// <param name="values">The measure name</param>
        public PivotDataSourceMeasureDescriptorBuilder Name(string name)
        {
            measure.Name = name;

            return this;
        }

        /// <summary>
        /// Sets measure type.
        /// </summary>
        /// <param name="values">The measure type</param>
        public PivotDataSourceMeasureDescriptorBuilder Type(string type)
        {
            measure.Type = type;

            return this;
        }
    }
}
