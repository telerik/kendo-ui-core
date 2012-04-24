namespace KendoUI.Mvc.UI
{
    public class TabStripClientEvents
    {
        public TabStripClientEvents()
        {
            OnLoad = new ClientEvent();
            OnError = new ClientEvent();
            OnSelect = new ClientEvent();
            OnContentLoad = new ClientEvent();
        }

        public ClientEvent OnLoad { get; private set; }

        public ClientEvent OnError { get; private set; }

        public ClientEvent OnSelect {  get; private set; }

        public ClientEvent OnContentLoad { get; private set; }
    }
}