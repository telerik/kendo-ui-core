namespace Kendo.Mvc.UI
{   
    public class DateTimePickerClientEvents
    {
        public DateTimePickerClientEvents()
        {
            OnLoad = new ClientEvent();
            OnChange = new ClientEvent();
            OnOpen = new ClientEvent();
            OnClose = new ClientEvent();
        }

        public ClientEvent OnLoad { get; private set; }

        public ClientEvent OnChange { get; private set; }

        public ClientEvent OnOpen { get; private set; }

        public ClientEvent OnClose { get; private set; }

        public void SerializeTo(IClientSideObjectWriter writer)
        {
            writer.AppendClientEvent("onLoad", OnLoad);
            writer.AppendClientEvent("onChange", OnChange);
            writer.AppendClientEvent("onOpen", OnOpen);
            writer.AppendClientEvent("onClose", OnClose);
        }
    }
}
