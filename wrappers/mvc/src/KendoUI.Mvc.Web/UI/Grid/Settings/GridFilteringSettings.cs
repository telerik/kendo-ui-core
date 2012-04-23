// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace KendoUI.Mvc.UI
{
    using System.Collections.Generic;

    public class GridFilteringSettings : IClientSerializable
    {
        public GridFilteringSettings()
        {
            Filters = new List<CompositeFilterDescriptor>();
        }

        public bool Enabled
        {
            get;
            set;
        }

        public bool ShowOrOption
        {
            get;
            set;
        }

        public IList<CompositeFilterDescriptor> Filters
        {
            get;
            private set;
        }

        #region IClientSerializable Members

        public void SerializeTo(string key, IClientSideObjectWriter writer)
        {
            if (Enabled) {
                writer.Append("showOrOption", ShowOrOption, false);
            }
        }

        #endregion
    }
}