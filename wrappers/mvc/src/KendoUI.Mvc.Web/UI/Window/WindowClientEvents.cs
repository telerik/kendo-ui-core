namespace KendoUI.Mvc.UI
{
    public class WindowClientEvents
    {
        public WindowClientEvents()
        {
            OnLoad = new ClientEvent();
            OnOpen = new ClientEvent();
            OnActivate = new ClientEvent();
            OnClose = new ClientEvent();
            OnMove = new ClientEvent();
            OnDragStart = new ClientEvent();
            OnDragEnd = new ClientEvent();
            OnResize = new ClientEvent();
            OnRefresh = new ClientEvent();
            OnError = new ClientEvent();
        }

        public ClientEvent OnLoad { get; private set; }

        public ClientEvent OnOpen { get; private set; }

        public ClientEvent OnActivate { get; private set; }

        public ClientEvent OnClose { get; private set; }

        public ClientEvent OnDragStart { get; private set; }

        public ClientEvent OnDragEnd { get; private set; }

        public ClientEvent OnMove { get; private set; }

        public ClientEvent OnResize { get; private set; }

        public ClientEvent OnRefresh { get; private set; }

        public ClientEvent OnError { get; private set; }
    }
}