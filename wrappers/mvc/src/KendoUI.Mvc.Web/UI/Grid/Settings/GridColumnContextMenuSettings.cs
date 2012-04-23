

namespace KendoUI.Mvc.UI
{
    public class GridColumnContextMenuSettings : IClientSerializable
    {
        private readonly IGrid grid;

        public GridColumnContextMenuSettings(IGrid grid)
        {
            this.grid = grid;                        
        }

        public bool Enabled
        {
            get;
            set;
        }        

        public void SerializeTo(string key, IClientSideObjectWriter writer)
        {
            if (Enabled)
            {                
                writer.Append("columnContextMenu", Enabled);
            }
        }
    }
}
