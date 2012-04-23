// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    public class TreeViewDataBindingConfiguration
    {
        public TreeViewDataBindingConfiguration()
        {
            Ajax = new TreeViewBindingSettings();
            WebService = new TreeViewBindingSettings();
        }

        public TreeViewBindingSettings Ajax
        {
            get;
            private set;
        }

        public TreeViewBindingSettings WebService
        {
            get;
            private set;
        }
    }
}
