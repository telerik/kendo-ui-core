namespace Kendo.Mvc.UI.Fluent
{
    using System;

    /// <summary>    
    /// Defines the fluent interface for configuring the <see cref="Schema"/> options.
    /// </summary>    
    public abstract class CustomDataSourceSchemaBuilderBase<TDataSourceSchemaBuilder> : IHideObjectMembers
         where TDataSourceSchemaBuilder : CustomDataSourceSchemaBuilderBase<TDataSourceSchemaBuilder>
    {
        protected readonly DataSourceSchema schema;

        public CustomDataSourceSchemaBuilderBase(DataSourceSchema schema)
        {
            this.schema = schema;
        }

        /// <summary>
        /// Sets Aggregates option.
        /// </summary>
        /// <param name="aggregates">Aggregates option</param>
        public virtual TDataSourceSchemaBuilder Aggregates(string aggregates)
        {
            schema.Aggregates = aggregates;

            return (TDataSourceSchemaBuilder)this;
        }

        /// <summary>
        /// Sets JavaScript function which to return aggregates.
        /// </summary>
        public virtual TDataSourceSchemaBuilder Aggregates(Func<object, object> handler)
        {
            schema.FunctionAggregates.TemplateDelegate = handler;

            return (TDataSourceSchemaBuilder)this;
        }

        /// <summary>
        /// Sets Groups option.
        /// </summary>
        /// <param name="groups">Groups option</param>
        public virtual TDataSourceSchemaBuilder Groups(string groups)
        {
            schema.Groups = groups;

            return (TDataSourceSchemaBuilder)this;
        }

        /// <summary>
        /// Sets JavaScript function which to return groups.
        /// </summary>
        public virtual TDataSourceSchemaBuilder Groups(Func<object, object> handler)
        {
            schema.FunctionGroups.TemplateDelegate = handler;

            return (TDataSourceSchemaBuilder)this;
        }

        /// <summary>
        /// Sets Data option.
        /// </summary>
        /// <param name="data">Data option</param>
        public virtual TDataSourceSchemaBuilder Data(string data)
        {
            schema.Data = data;

            return (TDataSourceSchemaBuilder)this;
        }

        /// <summary>
        /// Sets JavaScript function which to return data.
        /// </summary>
        public virtual TDataSourceSchemaBuilder Data(Func<object, object> handler)
        {
            schema.FunctionData.TemplateDelegate = handler;

            return (TDataSourceSchemaBuilder)this;
        }

        /// <summary>
        /// Sets Total option.
        /// </summary>
        /// <param name="total">Total option</param>
        public virtual TDataSourceSchemaBuilder Total(string total)
        {
            schema.Total = total;

            return (TDataSourceSchemaBuilder)this;
        }

        /// <summary>
        /// Sets JavaScript function which to return total.
        /// </summary>
        public virtual TDataSourceSchemaBuilder Total(Func<object, object> handler)
        {
            schema.FunctionTotal.TemplateDelegate = handler;

            return (TDataSourceSchemaBuilder)this;
        }

        /// <summary>
        /// Sets Errors option
        /// </summary>
        /// <param name="errors">Errors option</param>
        public virtual TDataSourceSchemaBuilder Errors(string errors)
        {
            schema.Errors = errors;

            return (TDataSourceSchemaBuilder)this;
        }

        /// <summary>
        /// Sets JavaScript function which to return the errors.
        /// </summary>
        public virtual TDataSourceSchemaBuilder Errors(Func<object, object> handler)
        {
            schema.FunctionErrors.TemplateDelegate = handler;

            return (TDataSourceSchemaBuilder)this;
        }

        /// <summary>
        /// Sets JavaScript function which to return data.
        /// </summary>
        public virtual TDataSourceSchemaBuilder Parse(Func<object, object> handler)
        {
            schema.Parse.TemplateDelegate = handler;

            return (TDataSourceSchemaBuilder)this;
        }

        /// <summary>
        /// Sets Schema Type option
        /// </summary>
        /// <param name="type">Type option</param>
        public virtual TDataSourceSchemaBuilder Type(string type)
        {
            schema.Type = type;

            return (TDataSourceSchemaBuilder)this;
        }
    }
}
