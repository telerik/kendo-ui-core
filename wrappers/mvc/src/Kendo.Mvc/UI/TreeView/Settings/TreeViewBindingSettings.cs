namespace Kendo.Mvc.UI
{
    public class TreeViewBindingSettings
    {
        public TreeViewBindingSettings()
        {
            Select = new RequestSettings();
        }

        public bool Enabled
        {
            get;
            set;
        }

        public RequestSettings Select
        {
            get;
            private set;
        }
    }
}
