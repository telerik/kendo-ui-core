namespace KendoUI.Mvc.UI
{
    using System;

    public class NumericTextBoxClientEvents
    {

        public NumericTextBoxClientEvents()
        {
            OnChange = new ClientEvent();
            OnSpin = new ClientEvent();
        }

        public ClientEvent OnChange { get; private set; }

        public ClientEvent OnSpin { get; private set; }

        public void SerializeTo(IClientSideObjectWriter writer)
        {
            writer.AppendClientEvent("change", OnChange);
            writer.AppendClientEvent("spin", OnSpin);
        }
    }
}
