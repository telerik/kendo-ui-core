// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    public class SplitterClientEvents
    {
        public SplitterClientEvents()
        {
            OnLoad = new ClientEvent();
            OnResize = new ClientEvent();
            OnExpand = new ClientEvent();
            OnCollapse = new ClientEvent();
            OnContentLoad = new ClientEvent();
        }

        public ClientEvent OnLoad
        {
            get;
            private set;
        }

        public ClientEvent OnResize
        {
            get;
            private set;
        }

        public ClientEvent OnExpand
        {
            get;
            private set;
        }

        public ClientEvent OnCollapse
        {
            get;
            private set;
        }

        public ClientEvent OnContentLoad
        {
            get;
            private set;
        }

        public void SerializeTo(IClientSideObjectWriter writer)
        {
            writer.AppendClientEvent("onLoad", OnLoad);
            writer.AppendClientEvent("onResize", OnResize);
            writer.AppendClientEvent("onExpand", OnExpand);
            writer.AppendClientEvent("onCollapse", OnCollapse);
            writer.AppendClientEvent("onContentLoad", OnContentLoad);
        }
    }
}