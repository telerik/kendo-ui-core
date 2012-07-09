namespace Kendo.Mvc.UI.Fluent
{
    using System;

    /// <summary>
    /// Defines the fluent interface for configuring <see cref="Grid{T}.Filterable"/>.
    /// </summary>
    public class GridFilterableSettingsBuilder : IHideObjectMembers
    {
        private readonly GridFilterableSettings settings;

        /// <summary>
        /// Initializes a new instance of the <see cref="GridFilterableSettings"/> class.
        /// </summary>
        /// <param name="settings">The settings.</param>
        public GridFilterableSettingsBuilder(GridFilterableSettings settings)
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
        public GridFilterableSettingsBuilder Enabled(bool value)
        {
            settings.Enabled = value;

            return this;
        }

        /// <summary>
        /// Configures the Filter menu operators.
        /// </summary>        
        /// <returns></returns>
        public GridFilterableSettingsBuilder Operators(Action<FilterableOperatorsBuilder> configurator)
        {
            configurator(new FilterableOperatorsBuilder(settings.Operators));

            return this;
        }

        /// <summary>
        /// Configures Filter menu messages.
        /// </summary>
        /// <param name="configurator"></param>
        /// <returns></returns>
        public GridFilterableSettingsBuilder Messages(Action<FilterableMessagesBuilder> configurator)
        {
            configurator(new FilterableMessagesBuilder(settings.Messages));

            return this;
        }

        /// <summary>
        /// Specify if the extra input fields should be visible within the filter menu. Default is true.
        /// </summary>
        /// <param name="value">True to show the extra inputs, otherwise false</param>
        /// <returns></returns>
        public GridFilterableSettingsBuilder Extra(bool value)
        {
            settings.Extra = value;
            settings.Enabled = true;

            return this;
        }        
    }
}