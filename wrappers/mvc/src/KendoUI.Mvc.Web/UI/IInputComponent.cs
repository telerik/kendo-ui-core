

namespace KendoUI.Mvc.UI
{
    using System;

    public interface IInputComponent<T> : IViewComponent where T : struct
    {
        Nullable<T> Value { get; set; }
    }
}
