namespace Kendo.Mvc.UI
{
    public interface IDropDownDataBindingConfiguration
    {
        IDropDownBindingSettings Ajax
        {
            get;
        }

        IDropDownBindingSettings WebService
        {
            get;
        }
    }
}
