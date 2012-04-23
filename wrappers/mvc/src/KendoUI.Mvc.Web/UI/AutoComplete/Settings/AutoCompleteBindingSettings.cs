

namespace KendoUI.Mvc.UI
{
    public class AutoCompleteBindingSettings : DropDownBindingSettings
    {
        public AutoCompleteBindingSettings() : base()
        {
            Cache = true;
            Delay = 200;
        }

        public bool Cache { get; set; }

        public int Delay { get; set; }
    }
}
