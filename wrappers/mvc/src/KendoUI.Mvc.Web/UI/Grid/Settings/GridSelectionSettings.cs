

namespace KendoUI.Mvc.UI
{

    public class GridSelectionSettings : IClientSerializable
    {
        public bool Enabled
        {
            get;
            set;
        }

        public void SerializeTo(string key, IClientSideObjectWriter writer)
        {
            if (Enabled)
            {
                writer.Append("selectable", true);
            }
        }
    }
}
