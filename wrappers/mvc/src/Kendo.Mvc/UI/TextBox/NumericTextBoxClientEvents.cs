namespace Kendo.Mvc.UI
{
    public class NumericTextBoxClientEvents
    {

        public NumericTextBoxClientEvents()
        {
            OnChange = new ClientEvent("change");
            OnSpin = new ClientEvent("spin");
        }

        public ClientEvent OnChange { get; private set; }

        public ClientEvent OnSpin { get; private set; }

        public void SerializeTo(System.Collections.Generic.IDictionary<string, object> json)
        {
            OnChange.Serialize(json);
            OnSpin.Serialize(json);
        }
    }
}
