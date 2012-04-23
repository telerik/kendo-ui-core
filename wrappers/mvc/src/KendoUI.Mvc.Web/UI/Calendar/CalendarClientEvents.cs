

namespace KendoUI.Mvc.UI
{
    using System;

    public class CalendarClientEvents
    {
        public CalendarClientEvents()
        {
            OnLoad = new ClientEvent();
            OnChange = new ClientEvent();
        }

        public ClientEvent OnLoad { get; private set; }

        public ClientEvent OnChange { get; private set; }
    }
}
