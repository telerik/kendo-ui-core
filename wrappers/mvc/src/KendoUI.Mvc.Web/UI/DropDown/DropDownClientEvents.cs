// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    public class DropDownClientEvents
    {
        public DropDownClientEvents()
        {
            OnLoad = new ClientEvent();
            OnChange = new ClientEvent();
            OnOpen = new ClientEvent();
            OnClose = new ClientEvent();
            OnDataBinding = new ClientEvent();
            OnDataBound = new ClientEvent();
            OnError = new ClientEvent();
        }

        public ClientEvent OnLoad { get; private set; }
        public ClientEvent OnChange { get; private set; }
        public ClientEvent OnOpen { get; private set; }
        public ClientEvent OnClose { get; private set; }
        public ClientEvent OnDataBinding { get; private set; }
        public ClientEvent OnDataBound { get; private set; }
        public ClientEvent OnError { get; private set; }

        public void SerializeTo(IClientSideObjectWriter writer)
        {
            writer.AppendClientEvent("onLoad", OnLoad);
            writer.AppendClientEvent("onChange", OnChange);
            writer.AppendClientEvent("onOpen", OnOpen);
            writer.AppendClientEvent("onClose", OnClose);
            writer.AppendClientEvent("onDataBinding", OnDataBinding);
            writer.AppendClientEvent("onDataBound", OnDataBound);
            writer.AppendClientEvent("onError", OnError);
        }
    }
}
