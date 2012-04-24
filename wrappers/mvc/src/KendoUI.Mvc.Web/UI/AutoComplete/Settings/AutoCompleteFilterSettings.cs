namespace KendoUI.Mvc.UI
{
    public class AutoCompleteFilterSettings
    {
        public AutoCompleteFilterSettings()
        {
            MinimumChars = 1;
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
