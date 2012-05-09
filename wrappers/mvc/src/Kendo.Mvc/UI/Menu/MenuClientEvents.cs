namespace Kendo.Mvc.UI
{
    public class MenuClientEvents
    {
        public MenuClientEvents()
        {
            OnOpen = new ClientEvent();
            OnClose = new ClientEvent();
            OnSelect = new ClientEvent();
            OnLoad = new ClientEvent();
        }

        public ClientEvent OnOpen { get; private set; }

        public ClientEvent OnClose { get; private set; }

        public ClientEvent OnSelect { get; private set; }

        public ClientEvent OnLoad { get; private set; }
    }
}