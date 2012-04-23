// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    public class MenuClientEvents
    {
        public MenuClientEvents()
        {
            OnOpen = new ClientEvent();
            OnClose = new ClientEvent();
            OnSelect = new ClientEvent();
            OnLoad = new ClientEvent();
        }

        public ClientEvent OnOpen { get; private set; }

        public ClientEvent OnClose { get; private set; }

        public ClientEvent OnSelect { get; private set; }

        public ClientEvent OnLoad { get; private set; }
    }
}