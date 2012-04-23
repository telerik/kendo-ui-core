// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    public class TabStripClientEvents
    {
        public TabStripClientEvents()
        {
            OnLoad = new ClientEvent();
            OnError = new ClientEvent();
            OnSelect = new ClientEvent();
            OnContentLoad = new ClientEvent();
        }

        public ClientEvent OnLoad { get; private set; }

        public ClientEvent OnError { get; private set; }

        public ClientEvent OnSelect {  get; private set; }

        public ClientEvent OnContentLoad { get; private set; }
    }
}