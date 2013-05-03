namespace Kendo.Mvc.UI.Fluent
{
    using System;

    /// <summary>
    /// Defines the fluent interface for configuring <see cref="Grid{T}.ColumnMenu"/>.
    /// </summary>
    public class GridColumnMenuSettingsBuilder : IHideObjectMembers
    {
        private readonly GridColumnMenuSettings settings;

        /// <summary>
        /// Initializes a new instance of the <see cref="GridColumnMenuSettings"/> class.
        /// </summary>
        /// <param name="settings">The settings.</param>
        public GridColumnMenuSettingsBuilder(GridColumnMenuSettings settings)
        {
            this.settings = settings;
        }

        /// <summary>
        /// Enables/disables header column menu.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Grid(Model)
        ///             .Name("Grid")
        ///             .ColumnMenu(menu => menu.Enabled((bool)ViewData["enableColumnMenu"]))
        /// %&gt;
        /// </code>
        /// </example>
        /// <remarks>
        /// The Enabled method is useful when you need to enable column menu based on certain conditions.
        /// </remarks>
        public GridColumnMenuSettingsBuilder Enabled(bool value)
        {
            settings.Enabled = value;

            return this;
        }

        /// <summary>
        /// Enables/disables sort section in header column menu.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Grid(Model)
        ///             .Name("Grid")
        ///             .ColumnMenu(menu => menu.Sortable((bool)ViewData["enableSort"]))
        /// %&gt;
        /// </code>
        /// </example>
        /// <remarks>
        /// The Enabled method is useful when you need to enable/disable sort section in column menu based on certain conditions.
        /// </remarks>
        public GridColumnMenuSettingsBuilder Sortable(bool value)
        {
            settings.Enabled = true;
            settings.Sortable = value;

            return this;
        }

        /// <summary>
        /// Enables/disables filter section in header column menu.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Grid(Model)
        ///             .Name("Grid")
        ///             .ColumnMenu(menu => menu.Filterable((bool)ViewData["enableFilter"]))
        /// %&gt;
        /// </code>
        /// </example>
        /// <remarks>
        /// The Enabled method is useful when you need to enable/disable filter section in column menu based on certain conditions.
        /// </remarks>
        public GridColumnMenuSettingsBuilder Filterable(bool value)
        {
            settings.Enabled = true;
            settings.Filterable = value;

            return this;
        }

        /// <summary>
        /// Enables/disables columns section in header column menu.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Grid(Model)
        ///             .Name("Grid")
        ///             .ColumnMenu(menu => menu.Columns((bool)ViewData["enableColumns"]))
        /// %&gt;
        /// </code>
        /// </example>
        /// <remarks>
        /// The Enabled method is useful when you need to enable/disable columns section in column menu based on certain conditions.
        /// </remarks>
        public GridColumnMenuSettingsBuilder Columns(bool value)
        {
            settings.Enabled = true;
            settings.Columns = value;

            return this;
        }

        /// <summary>
        /// Enables you to define custom messages in grid column menu.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Grid(Model)
        ///             .Name("Grid")
        ///             .ColumnMenu(menu => menu.Messages(msg => msg.Filter("Custom filter message")))
        /// %&gt;
        /// </code>
        /// </example>
        public GridColumnMenuSettingsBuilder Messages(Action<ColumnMenuMessagesBuilder> configurator)
        {
            configurator(new ColumnMenuMessagesBuilder(settings.Messages));

            return this;
        }
    }
}
