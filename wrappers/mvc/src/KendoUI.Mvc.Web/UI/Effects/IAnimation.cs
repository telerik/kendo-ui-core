

namespace KendoUI.Mvc.UI
{
    public interface IAnimation
    {
        string Name { get; }
        int OpenDuration { get; set; }
        int CloseDuration { get; set; }
    }
}
