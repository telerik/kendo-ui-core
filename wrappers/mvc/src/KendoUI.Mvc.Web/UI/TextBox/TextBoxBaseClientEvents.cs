// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System;

    public class TextBoxBaseClientEvents
    {

        public TextBoxBaseClientEvents()
        {
            OnLoad = new ClientEvent();
            OnChange = new ClientEvent();
        }

        public ClientEvent OnLoad { get; private set; }

        public ClientEvent OnChange { get; private set; }

        public void SerializeTo(IClientSideObjectWriter writer)
        {
            writer.AppendClientEvent("onLoad", OnLoad);
            writer.AppendClientEvent("onChange", OnChange);
        }
    }
}
