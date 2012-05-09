namespace Kendo.Mvc.UI
{
    public class DropDownBindingSettings : IDropDownBindingSettings
    {
        public DropDownBindingSettings()
        {
            Select = new RequestSettings();
        }

        public bool Enabled
        {
            get;
            set;
        }

        public INavigatable Select
        {
            get;
            private set;
        }
    }
}
