// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.
namespace Telerik.Web.Mvc.UI
{
    public class EditorClientEvents
    {
        public EditorClientEvents()
        {
            OnLoad = new ClientEvent();
            OnSelectionChange = new ClientEvent();
            OnChange = new ClientEvent();
            OnExecute = new ClientEvent();
            OnError = new ClientEvent();
            OnPaste = new ClientEvent();
        }

        public ClientEvent OnChange
        {
            get;
            private set;
        }
        
        public ClientEvent OnError
        {
            get;
            private set;
        }
        
        public ClientEvent OnExecute
        {
            get;
            private set;
        }

        public ClientEvent OnLoad
        {
            get;
            private set;
        }

        public ClientEvent OnSelectionChange
        {
            get;
            private set;
        }

        public ClientEvent OnPaste 
        { 
            get; 
            private set;
        }

        public void SerializeTo(IClientSideObjectWriter writer)
        {
            writer.AppendClientEvent("onLoad", OnLoad);
            writer.AppendClientEvent("onPaste", OnPaste);
            writer.AppendClientEvent("onSelectionChange", OnSelectionChange);
            writer.AppendClientEvent("onChange", OnChange);
            writer.AppendClientEvent("onExecute", OnExecute);
            writer.AppendClientEvent("onError", OnError);
        }
    }
}