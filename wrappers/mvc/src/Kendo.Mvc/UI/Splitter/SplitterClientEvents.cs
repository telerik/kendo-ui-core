namespace Kendo.Mvc.UI
{
    public class SplitterClientEvents
    {
        public SplitterClientEvents()
        {
            OnResize = new ClientEvent();
            OnExpand = new ClientEvent();
            OnCollapse = new ClientEvent();
            OnContentLoad = new ClientEvent();
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
            writer.AppendClientEvent("resize", OnResize);
            writer.AppendClientEvent("expand", OnExpand);
            writer.AppendClientEvent("collapse", OnCollapse);
            writer.AppendClientEvent("contentLoad", OnContentLoad);
        }
    }
}