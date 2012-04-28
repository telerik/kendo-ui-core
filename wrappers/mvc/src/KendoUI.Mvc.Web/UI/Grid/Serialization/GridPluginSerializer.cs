namespace KendoUI.Mvc.UI
{
    using System.Collections.Generic;
    using System.Linq;
    
    class GridPluginSerializer
    {
        private readonly IGrid grid;

        public GridPluginSerializer(IGrid grid)
        {
            this.grid = grid;
        }

        public IEnumerable<string> Serialize()
        {
            var result = new List<string>();

            if (grid.Grouping.Enabled)
            {
                result.Add("grouping");
            }

            if (grid.Editing.Enabled)
            {
                result.Add("editing");
            }

            if (grid.Filtering.Enabled)
            {
                result.Add("filtering");
            }

            if (grid.Resizing.Enabled)
            {
                result.Add("resizing");
            }            
            
            if (grid.Reordering.Enabled)
            {
                result.Add("reordering");
            }
            
            return result;
        }
        
        public void SerializeTo(IClientSideObjectWriter writer)
        {
            var result = Serialize();
            if (result.Any())
            {
                writer.AppendCollection("plugins", result);
            }
        }
    }
}
