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

        public GridFilterableSettingsBuilder Operators(Action<FilterableOperatorsBuilder> configurator)
        {
            configurator(new FilterableOperatorsBuilder(settings.Operators));

            return this;
        }

        public GridFilterableSettingsBuilder Messages(Action<FilterableMessagesBuilder> configurator)
        {
            configurator(new FilterableMessagesBuilder(settings.Messages));

            return this;
        }

        public GridFilterableSettingsBuilder Extra(bool value)
        {
            settings.Extra = value;
            settings.Enabled = true;

            return this;
        }

        public GridFilterableSettingsBuilder Extra()
        {
            settings.Extra = true;
            settings.Enabled = true;

            return this;
        }
    }
}