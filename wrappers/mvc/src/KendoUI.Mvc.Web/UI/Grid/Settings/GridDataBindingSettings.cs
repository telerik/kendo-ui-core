// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    public class GridDataBindingSettings
    {
        public GridDataBindingSettings(IGrid grid)
        {
            Server = new GridBindingSettings(grid);
            Ajax = new GridClientBindingSettings(grid);
            WebService = new GridClientBindingSettings(grid);
        }

        public GridBindingSettings Server
        {
            get;
            private set;
        }

        public GridClientBindingSettings Ajax
        {
            get;
            private set;
        }

        public GridClientBindingSettings WebService
        {
            get;
            private set;
        }

        public bool IsClientOperationMode
        {
            get
            {
                return (Ajax.Enabled && Ajax.OperationMode == GridOperationMode.Client) ||
                       (WebService.Enabled && WebService.OperationMode == GridOperationMode.Client);
            }
        }
    }
}
