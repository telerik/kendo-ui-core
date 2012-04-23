
namespace KendoUI.Mvc.UI
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