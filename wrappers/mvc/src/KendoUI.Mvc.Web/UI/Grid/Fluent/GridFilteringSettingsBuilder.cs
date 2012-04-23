// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace KendoUI.Mvc.UI.Fluent
{
    using System;

    using Infrastructure;

    /// <summary>
    /// Defines the fluent interface for configuring <see cref="Grid{T}.Filtering"/>.
    /// </summary>
    public class GridFilteringSettingsBuilder<TModel>  : IHideObjectMembers where TModel : class
    {
        private readonly GridFilteringSettings settings;

        /// <summary>
        /// Initializes a new instance of the <see cref="GridFilteringSettings"/> class.
        /// </summary>
        /// <param name="settings">The settings.</param>
        public GridFilteringSettingsBuilder(GridFilteringSettings settings)
        {
            this.settings = settings;
        }

        /// <summary>
        /// Enables or disables filtering
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .Filterable(filtering => filtering.Enabled((bool)ViewData["enableFiltering"]))
        /// %&gt;
        /// </code>
        /// </example>
        /// <remarks>
        /// The Enabled method is useful when you need to enable filtering based on certain conditions.
        /// </remarks>
        public virtual GridFilteringSettingsBuilder<TModel> Enabled(bool value)
        {
            settings.Enabled = value;

            return this;
        }

        public virtual GridFilteringSettingsBuilder<TModel> Filters(Action<GridFilterDescriptorFactory<TModel>> configurator)
        {
            Guard.IsNotNull(configurator, "configurator");

            settings.Enabled = true;

            GridFilterDescriptorFactory<TModel> factory = new GridFilterDescriptorFactory<TModel>(settings.Filters);

            configurator(factory);

            return this;
        }

        public virtual GridFilteringSettingsBuilder<TModel> ShowOrOption(bool value)
        {
            settings.ShowOrOption = value;
            settings.Enabled = true;
            return this;
        }

        public virtual GridFilteringSettingsBuilder<TModel> ShowOrOption()
        {
            settings.ShowOrOption = true;
            settings.Enabled = true;
            return this;
        }
    }
}