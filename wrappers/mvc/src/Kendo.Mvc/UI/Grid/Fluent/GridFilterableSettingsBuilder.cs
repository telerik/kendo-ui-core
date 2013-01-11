namespace Kendo.Mvc.UI.Fluent
{
    using System;

    /// <summary>
    /// Defines the fluent interface for configuring <see cref="Grid{T}.Filterable"/>.
    /// </summary>
    public class GridFilterableSettingsBuilder : GridFilterableSettingsBuilderBase<GridFilterableSettingsBuilder>
    {
        public GridFilterableSettingsBuilder(GridFilterableSettings settings) : base(settings)
        {
        } 
    }

    public abstract class GridFilterableSettingsBuilderBase<TDataSourceBuilder> : IHideObjectMembers
        where TDataSourceBuilder : GridFilterableSettingsBuilderBase<TDataSourceBuilder>
    {
        private readonly GridFilterableSettings settings;

        /// <summary>
        /// Initializes a new instance of the <see cref="GridFilterableSettings"/> class.
        /// </summary>
        /// <param name="settings">The settings.</param>
        public GridFilterableSettingsBuilderBase(GridFilterableSettings settings)
        {
            this.settings = settings;
        }

        /// <summary>
        /// Enables or disables filtering
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Grid(Model)
        ///             .Name("Grid")
        ///             .Filterable(filtering => filtering.Enabled((bool)ViewData["enableFiltering"]))
        /// %&gt;
        /// </code>
        /// </example>
        /// <remarks>
        /// The Enabled method is useful when you need to enable filtering based on certain conditions.
        /// </remarks>
        public TDataSourceBuilder Enabled(bool value)
        {
            settings.Enabled = value;

            return (TDataSourceBuilder)this;
        }

        /// <summary>
        /// Configures the Filter menu operators.
        /// </summary>        
        /// <returns></returns>
        public TDataSourceBuilder Operators(Action<FilterableOperatorsBuilder> configurator)
        {
            configurator(new FilterableOperatorsBuilder(settings.Operators));

            return (TDataSourceBuilder)this;
        }

        /// <summary>
        /// Configures Filter menu messages.
        /// </summary>
        /// <param name="configurator"></param>
        /// <returns></returns>
        public TDataSourceBuilder Messages(Action<FilterableMessagesBuilder> configurator)
        {
            configurator(new FilterableMessagesBuilder(settings.Messages));

            return (TDataSourceBuilder)this;
        }

        /// <summary>
        /// Specify if the extra input fields should be visible within the filter menu. Default is true.
        /// </summary>
        /// <param name="value">True to show the extra inputs, otherwise false</param>
        /// <returns></returns>
        public TDataSourceBuilder Extra(bool value)
        {
            settings.Extra = value;
            settings.Enabled = true;

            return (TDataSourceBuilder)this;
        }       
    }    
}