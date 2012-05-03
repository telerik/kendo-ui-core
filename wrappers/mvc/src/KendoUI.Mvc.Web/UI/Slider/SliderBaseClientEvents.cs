namespace KendoUI.Mvc.UI
{
    public class SliderBaseClientEvents
    {
        public SliderBaseClientEvents()
        {
            OnLoad = new ClientEvent();
            OnChange = new ClientEvent();
            OnSlide = new ClientEvent();
        }

        public ClientEvent OnLoad { get; private set; }

        public ClientEvent OnChange { get; private set; }

        public ClientEvent OnSlide { get; private set; }

        public void SerializeTo(IClientSideObjectWriter writer)
        {
            writer.AppendClientEvent("load", OnLoad);
            writer.AppendClientEvent("change", OnChange);
            writer.AppendClientEvent("slide", OnSlide);
        }
    }
}