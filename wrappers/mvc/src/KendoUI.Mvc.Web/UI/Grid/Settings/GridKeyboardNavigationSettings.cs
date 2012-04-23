

namespace KendoUI.Mvc.UI
{
    public class GridKeyboardNavigationSettings : IClientSerializable
    {
        private readonly IGrid grid;

        public GridKeyboardNavigationSettings(IGrid grid)
        {
            this.grid = grid;                        
        }

        public bool Enabled
        {
            get;
            set;
        }

        public bool EditOnTab
        {
            get;
            set;
        }

        public void SerializeTo(string key, IClientSideObjectWriter writer)
        {
            if (Enabled)
            {
                if (EditOnTab)
                {
                    writer.AppendObject("keyboardNavigation", new { editOnTab = EditOnTab });
                }
                else
                {
                    writer.Append("keyboardNavigation", Enabled);
                }
            }
        }
    }
}
