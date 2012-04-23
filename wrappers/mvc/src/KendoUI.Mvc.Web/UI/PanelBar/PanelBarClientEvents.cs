// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System;

    public class PanelBarClientEvents
    {
        public PanelBarClientEvents()
        {
            OnExpand = new ClientEvent();
            OnCollapse = new ClientEvent();
            OnSelect = new ClientEvent();
            OnLoad = new ClientEvent();
            OnError = new ClientEvent();
        }

        public ClientEvent OnExpand { get; private set; }

        public ClientEvent OnCollapse { get; private set; }

        public ClientEvent OnSelect { get; private set; }

        public ClientEvent OnLoad { get; private set; }

        public ClientEvent OnError { get; private set; }
    }
}