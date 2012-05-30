namespace Kendo.Mvc.UI
{
    public class TreeViewDataBindingConfiguration
    {
        public TreeViewDataBindingConfiguration()
        {
            Ajax = new TreeViewBindingSettings();
            WebService = new TreeViewBindingSettings();
        }

        public TreeViewBindingSettings Ajax
        {
            get;
            private set;
        }

        public TreeViewBindingSettings WebService
        {
            get;
            private set;
        }
    }
}
