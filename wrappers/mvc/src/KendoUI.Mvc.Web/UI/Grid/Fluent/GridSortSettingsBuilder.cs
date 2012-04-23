// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace KendoUI.Mvc.UI.Fluent
{
    using System;

    using Infrastructure;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="Grid{T}.Sorting"/>.
    /// </summary>
    public class GridSortSettingsBuilder<TModel> : IHideObjectMembers where TModel : class
    {
        private readonly GridSortSettings settings;

        /// <summary>
        /// Initializes a new instance of the <see cref="GridSortSettingsBuilder{T}"/> class.
        /// </summary>
        /// <param name="settings">The settings.</param>
        public GridSortSettingsBuilder(GridSortSettings settings)
        {
            this.settings = settings;
        }
        
        /// <summary>
        /// Enables or disables sorting.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .Sorting(sorting => sorting.Enabled((bool)ViewData["enableSorting"]))
        /// %&gt;
        /// </code>
        /// </example>
        /// <remarks>
        /// The Enabled method is useful when you need to enable sorting based on certain conditions.
        /// </remarks>
        public virtual GridSortSettingsBuilder<TModel> Enabled(bool value)
        {
            settings.Enabled = value;

            return this;
        }

        /// <summary>
        /// Sets the sort mode of the grid.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .Sorting(sorting => sorting.SortMode(GridSortMode.MultipleColumns))
        /// %&gt;
        /// </code>
        /// </example>
        public virtual GridSortSettingsBuilder<TModel> SortMode(GridSortMode value)
        {
            settings.SortMode = value;

            return this;
        }

        /// <summary>
        /// Enables or disables unsorted mode.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .Sorting(sorting => sorting.AllowUnsort(true))
        /// %&gt;
        /// </code>
        /// </example>
        public virtual GridSortSettingsBuilder<TModel> AllowUnsort(bool value)
        {
            settings.AllowUnsort = value;

            return this;
        }

        /// <summary>
        /// Configures the initial sort order.
        /// </summary>
        /// <param name="configurator">The configurator.</param>
        /// <returns></returns>
        public virtual GridSortSettingsBuilder<TModel> OrderBy(Action<GridSortDescriptorFactory<TModel>> configurator)
        {
            Guard.IsNotNull(configurator, "configurator");

            GridSortDescriptorFactory<TModel> factory = new GridSortDescriptorFactory<TModel>(settings);

            configurator(factory);

            return this;
        }
    }
}