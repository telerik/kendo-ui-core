namespace Kendo.Mvc.UI
{
    public class TabStripClientEvents
    {
        public TabStripClientEvents()
        {
            OnSelect = new ClientEvent();
            OnActivate = new ClientEvent();
            OnContentLoad = new ClientEvent();
            OnError = new ClientEvent();
        }

        public ClientEvent OnSelect { get; private set; }

        public ClientEvent OnActivate { get; private set; }

        public ClientEvent OnContentLoad { get; private set; }

        public ClientEvent OnError { get; private set; }
    }
}