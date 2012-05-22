namespace Kendo.Mvc.UI
{
    using Extensions;
    using System.Linq;

    public class ExpandableAnimation
    {
        public ExpandableAnimation()
        {
            Enabled = true;
            Expand = new Effects("expand");
            Collapse = new Effects("collapse");
        }

        public bool Enabled 
        { 
            get; 
            set; 
        }

        public Effects Expand 
        { 
            get; 
            set; 
        }

        public Effects Collapse
        {
            get;
            set;
        }

        public void SerializeTo(IClientSideObjectWriter writer)
        {
            if (Enabled == false)
            {
                writer.Append("animation", Enabled);
            }
            else
            {
                var result = string.Join(",", new string[] { Expand.Serialize(), Collapse.Serialize() }.Where(item => item.HasValue()));

                if (result.HasValue())
                {
                    writer.Append("animation: {{{0}}}".FormatWith(result));
                }
            }
        }
    }
}
