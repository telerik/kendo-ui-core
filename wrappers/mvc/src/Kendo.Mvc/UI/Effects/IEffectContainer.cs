namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;

    public interface IEffectContainer
    {
        IList<IEffect> Container { get; }
        int OpenDuration { get; set; }
        int CloseDuration { get; set; }
    }
}