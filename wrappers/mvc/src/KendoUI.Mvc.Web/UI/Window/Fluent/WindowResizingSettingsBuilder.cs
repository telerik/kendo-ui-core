// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Fluent
{
    using Infrastructure;

    public class WindowResizingSettingsBuilder
    {
        private readonly WindowResizingSettings settings;

        public WindowResizingSettingsBuilder(WindowResizingSettings settings)
        {
            Guard.IsNotNull(settings, "settings");
            this.settings = settings;
        }

        public WindowResizingSettingsBuilder Enabled(bool enable) 
        {
            Guard.IsNotNull(enable, "enable");

            settings.Enabled = enable;

            return this;
        }

        public WindowResizingSettingsBuilder MinWidth(int minWidth)
        {
            Guard.IsNotNull(minWidth, "minWidth");

            settings.MinWidth = minWidth;

            return this;
        }

        public WindowResizingSettingsBuilder MaxWidth(int maxWidth)
        {
            Guard.IsNotNull(maxWidth, "maxWidth");

            settings.MaxWidth = maxWidth;

            return this;
        }

        public WindowResizingSettingsBuilder MinHeight(int minHeight)
        {
            Guard.IsNotNull(minHeight, "minHeight");

            settings.MinHeight = minHeight;

            return this;
        }

        public WindowResizingSettingsBuilder MaxHeight(int maxHeight)
        {
            Guard.IsNotNull(maxHeight, "maxHeight");

            settings.MaxHeight = maxHeight;

            return this;
        }
    }
}
