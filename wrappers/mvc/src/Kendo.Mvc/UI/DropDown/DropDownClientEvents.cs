namespace Kendo.Mvc.UI
{
    public class DropDownClientEvents
    {
        public DropDownClientEvents()
        {
            Select = new ClientEvent();
            Change = new ClientEvent();
            Open = new ClientEvent();
            Close = new ClientEvent();
        }

        public ClientEvent Select { get; private set; }
        public ClientEvent Change { get; private set; }
        public ClientEvent Open { get; private set; }
        public ClientEvent Close { get; private set; }

        public void SerializeTo(IClientSideObjectWriter writer)
        {
            writer.AppendClientEvent("select", Select);
            writer.AppendClientEvent("change", Change);
            writer.AppendClientEvent("open", Open);
            writer.AppendClientEvent("close", Close);
        }
    }
}
