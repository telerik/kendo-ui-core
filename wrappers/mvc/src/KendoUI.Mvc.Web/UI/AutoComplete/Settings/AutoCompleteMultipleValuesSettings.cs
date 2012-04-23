// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    public class AutoCompleteMultipleValuesSettings
    {
        private const string defaultSeparator = ", ";

        public AutoCompleteMultipleValuesSettings()
        {
            Separator = defaultSeparator;
        }

        public bool Enabled
        {
            get;
            set;
        }

        public string Separator
        {
            get;
            set;
        }

        public void SerializeTo(IClientSideObjectWriter writer)
        {
            writer.Append("multiple", Enabled, false);
            if (!Separator.Equals(defaultSeparator)) writer.Append("separator", Separator);
        }
    }
}
