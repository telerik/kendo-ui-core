

namespace KendoUI.Mvc.UI
{
    using System;

    public class PanelBarClientEvents
    {
        public PanelBarClientEvents()
        {
            OnExpand = new ClientEvent();
            OnCollapse = new ClientEvent();
            OnSelect = new ClientEvent();
            OnLoad = new ClientEvent();
            OnError = new ClientEvent();
        }

        public ClientEvent OnExpand { get; private set; }

        public ClientEvent OnCollapse { get; private set; }

        public ClientEvent OnSelect { get; private set; }

        public ClientEvent OnLoad { get; private set; }

        public ClientEvent OnError { get; private set; }
    }
}