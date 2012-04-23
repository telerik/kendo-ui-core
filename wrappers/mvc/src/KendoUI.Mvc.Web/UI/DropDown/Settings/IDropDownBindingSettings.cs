
namespace KendoUI.Mvc.UI
{
    public interface IDropDownBindingSettings
    {
        bool Enabled
        {
            get;
            set;
        }

        INavigatable Select
        {
            get;
        }
    }
}
