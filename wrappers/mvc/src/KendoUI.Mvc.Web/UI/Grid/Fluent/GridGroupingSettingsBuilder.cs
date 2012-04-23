// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.
namespace Telerik.Web.Mvc.UI.Fluent
{
    using System;
    
    using Infrastructure;

    public class GridGroupingSettingsBuilder<T> : IHideObjectMembers
        where T : class
    {
        private readonly GridGroupingSettings settings;
        
        public GridGroupingSettingsBuilder(GridGroupingSettings settings)
        {
            this.settings = settings;
        }

        public GridGroupingSettingsBuilder<T> Enabled(bool value)
        {
            settings.Enabled = value;
            return this;
        }

        /// <summary>
        /// Determines if group header should be shown.
        /// </summary>
        /// <param name="value">true if visible, otherwise false.</param>
        public GridGroupingSettingsBuilder<T> Visible(bool value)
        {
            settings.Visible = value;
            return this;
        }

        public GridGroupingSettingsBuilder<T> Groups(Action<GridGroupDescriptorFactory<T>> configurator)
        {
            Guard.IsNotNull(configurator, "configurator");

            configurator(new GridGroupDescriptorFactory<T>(settings));

            return this;
        }
    }
}
