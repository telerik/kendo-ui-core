

namespace KendoUI.Mvc.UI
{
    using System;

    public class TextBoxBaseClientEvents
    {

        public TextBoxBaseClientEvents()
        {
            OnLoad = new ClientEvent();
            OnChange = new ClientEvent();
        }

        public ClientEvent OnLoad { get; private set; }

        public ClientEvent OnChange { get; private set; }

        public void SerializeTo(IClientSideObjectWriter writer)
        {
            writer.AppendClientEvent("onLoad", OnLoad);
            writer.AppendClientEvent("onChange", OnChange);
        }
    }
}
