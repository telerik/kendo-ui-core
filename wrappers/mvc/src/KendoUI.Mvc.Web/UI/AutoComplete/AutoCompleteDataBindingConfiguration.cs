// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    public class AutoCompleteDataBindingConfiguration : IDropDownDataBindingConfiguration
    {
        public AutoCompleteDataBindingConfiguration()
        {
            Ajax = new AutoCompleteBindingSettings();
            WebService = new AutoCompleteBindingSettings();
        }

        public IDropDownBindingSettings Ajax
        {
            get;
            private set;
        }

        public IDropDownBindingSettings WebService
        {
            get;
            private set;
        }
    }
}
