namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="PivotDataSourceSchemaCube"/> Dimensions.
    /// </summary>
    public class PivotAjaxDataSourceSchemaCubeDimensionBuilder
    {
        protected readonly PivotDataSourceSchemaDimensionDescriptor dimension;

        public PivotAjaxDataSourceSchemaCubeDimensionBuilder(PivotDataSourceSchemaDimensionDescriptor dimension)
        {
            this.dimension = dimension;
        }

        /// <summary>
        /// Describes a caption of the dimension.
        /// </summary>
        /// <param name="caption">The caption for the dimension.</param>
        public PivotAjaxDataSourceSchemaCubeDimensionBuilder Caption(string caption)
        {
            dimension.Caption = caption;

            return this;
        }
    }
}
