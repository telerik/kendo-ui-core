

namespace KendoUI.Mvc.UI
{
    public class AutoCompleteDataBindingConfiguration : IDropDownDataBindingConfiguration
    {
        public AutoCompleteDataBindingConfiguration()
        {
            Ajax = new AutoCompleteBindingSettings();
            WebService = new AutoCompleteBindingSettings();
        }

        public IDropDownBindingSettings Ajax
        {
            get;
            private set;
        }

        public IDropDownBindingSettings WebService
        {
            get;
            private set;
        }
    }
}
