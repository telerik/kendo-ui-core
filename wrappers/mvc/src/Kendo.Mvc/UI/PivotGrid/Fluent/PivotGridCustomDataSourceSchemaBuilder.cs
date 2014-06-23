namespace Kendo.Mvc.UI.Fluent
{
    using System;

    /// <summary>    
    /// Defines the fluent interface for configuring the <see cref="PivotGridDataSourceSchema"/> options.
    /// </summary>    
    public class PivotGridCustomDataSourceSchemaBuilder
    {
        protected readonly PivotGridDataSourceSchema schema;

        public PivotGridCustomDataSourceSchemaBuilder(PivotGridDataSourceSchema schema)
        {
            this.schema = schema;
        }

        /// <summary>
        /// Sets Axes option.
        /// </summary>
        /// <param name="axes">Axes option</param>
        public virtual PivotGridCustomDataSourceSchemaBuilder Axes(string axes)
        {
            schema.Axes = axes;

            return this;
        }

        /// <summary>
        /// Sets JavaScript function which to return axes.
        /// </summary>
        public virtual PivotGridCustomDataSourceSchemaBuilder Axes(Func<object, object> handler)
        {
            schema.FunctionAxes.TemplateDelegate = handler;

            return this;
        }

        /// <summary>
        /// Sets Cubes option.
        /// </summary>
        /// <param name="cubes">Cubes option</param>
        public virtual PivotGridCustomDataSourceSchemaBuilder Cubes(string cubes)
        {
            schema.Cubes = cubes;

            return this;
        }

        /// <summary>
        /// Sets JavaScript function which to return cubes.
        /// </summary>
        public virtual PivotGridCustomDataSourceSchemaBuilder Cubes(Func<object, object> handler)
        {
            schema.FunctionCubes.TemplateDelegate = handler;

            return this;
        }

        /// <summary>
        /// Sets Catalogs option.
        /// </summary>
        /// <param name="catalogs">Catalogs option</param>
        public virtual PivotGridCustomDataSourceSchemaBuilder Catalogs(string catalogs)
        {
            schema.Catalogs = catalogs;

            return this;
        }

        /// <summary>
        /// Sets JavaScript function which to return catalogs.
        /// </summary>
        public virtual PivotGridCustomDataSourceSchemaBuilder Catalogs(Func<object, object> handler)
        {
            schema.FunctionCatalogs.TemplateDelegate = handler;

            return this;
        }

        /// <summary>
        /// Sets Measures option.
        /// </summary>
        /// <param name="measures">Measures option</param>
        public virtual PivotGridCustomDataSourceSchemaBuilder Measures(string measures)
        {
            schema.Measures = measures;

            return this;
        }

        /// <summary>
        /// Sets JavaScript function which to return measures.
        /// </summary>
        public virtual PivotGridCustomDataSourceSchemaBuilder Measures(Func<object, object> handler)
        {
            schema.FunctionMeasures.TemplateDelegate = handler;

            return this;
        }

        /// <summary>
        /// Sets Dimensions option.
        /// </summary>
        /// <param name="dimensions">Dimensions option</param>
        public virtual PivotGridCustomDataSourceSchemaBuilder Dimensions(string dimensions)
        {
            schema.Dimensions = dimensions;

            return this;
        }

        /// <summary>
        /// Sets JavaScript function which to return dimensions.
        /// </summary>
        public virtual PivotGridCustomDataSourceSchemaBuilder Dimensions(Func<object, object> handler)
        {
            schema.FunctionDimensions.TemplateDelegate = handler;

            return this;
        }

        /// <summary>
        /// Sets Hierarchies option.
        /// </summary>
        /// <param name="hierarchies">Hierarchies option</param>
        public virtual PivotGridCustomDataSourceSchemaBuilder Hierarchies(string hierarchies)
        {
            schema.Hierarchies = hierarchies;

            return this;
        }

        /// <summary>
        /// Sets JavaScript function which to return hierarchies.
        /// </summary>
        public virtual PivotGridCustomDataSourceSchemaBuilder Hierarchies(Func<object, object> handler)
        {
            schema.FunctionHierarchies.TemplateDelegate = handler;

            return this;
        }

        /// <summary>
        /// Sets Levels option.
        /// </summary>
        /// <param name="levels">Levels option</param>
        public virtual PivotGridCustomDataSourceSchemaBuilder Levels(string levels)
        {
            schema.Levels = levels;

            return this;
        }

        /// <summary>
        /// Sets JavaScript function which to return levels.
        /// </summary>
        public virtual PivotGridCustomDataSourceSchemaBuilder Levels(Func<object, object> handler)
        {
            schema.FunctionLevels.TemplateDelegate = handler;

            return this;
        }

        /// <summary>
        /// Sets Schema Type option
        /// </summary>
        /// <param name="type">Type option</param>
        public virtual PivotGridCustomDataSourceSchemaBuilder Type(string type)
        {
            schema.Type = type;

            return this;
        }

    }
}
