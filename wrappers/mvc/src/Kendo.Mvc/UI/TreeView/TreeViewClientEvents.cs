namespace Kendo.Mvc.UI
{
    public class TreeViewClientEvents
    {
        public TreeViewClientEvents()
        {
            OnExpand = new ClientEvent();
            OnCollapse = new ClientEvent();
            OnSelect = new ClientEvent();
            OnDragStart = new ClientEvent();
            OnDrag = new ClientEvent();
            OnDragCancelled = new ClientEvent();
            OnDrop = new ClientEvent();
            OnDragEnd = new ClientEvent();
        }

        public ClientEvent OnExpand { get; set; }

        public ClientEvent OnCollapse { get; set; }

        public ClientEvent OnSelect { get; set; }

        public ClientEvent OnDragStart { get; set; }

        public ClientEvent OnDrag { get; set; }

        public ClientEvent OnDragCancelled { get; set; }

        public ClientEvent OnDrop { get; set; }

        public ClientEvent OnDragEnd { get; set; }
    }
}