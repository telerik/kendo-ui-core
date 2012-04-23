namespace Telerik.Web.Mvc.UI
{
    public class DropDownListDataBindingConfiguration : IDropDownDataBindingConfiguration
    {
        public DropDownListDataBindingConfiguration()
        {
            Ajax = new DropDownBindingSettings();
            WebService = new DropDownBindingSettings();
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
