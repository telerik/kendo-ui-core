

namespace KendoUI.Mvc.UI
{
    public class ComboBoxFilterSettings
    {
        public ComboBoxFilterSettings()
        {
            MinimumChars = 0;
        }

        public bool Enabled
        {
            get;
            set;
        }

        public AutoCompleteFilterMode FilterMode
        {
            get;
            set;
        }

        public int MinimumChars
        {
            get;
            set;
        }
    }
}
