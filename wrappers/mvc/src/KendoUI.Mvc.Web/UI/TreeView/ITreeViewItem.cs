

namespace KendoUI.Mvc.UI
{

    public interface ITreeViewItem
    {
        string Value { get; }

        bool Expanded { get; }

        bool Checked { get; }

        bool Checkable { get; }

        bool LoadOnDemand { get; }
    }
}
