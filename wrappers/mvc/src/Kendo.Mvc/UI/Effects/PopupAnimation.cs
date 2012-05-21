namespace Kendo.Mvc.UI
{
    using Extensions;
    using System.Linq;

    public class PopupAnimation
    {
        public PopupAnimation()
        {
            Enabled = true;
            Open = new Effects("open");
            Close = new Effects("close");
        }

        public bool Enabled 
        { 
            get; 
            set; 
        }

        public Effects Open 
        { 
            get; 
            set; 
        }

        public Effects Close
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
                var result = string.Join(",", new string[] { Open.Serialize(), Close.Serialize() }.Where(item => item.HasValue()));

                if (result.HasValue())
                {
                    writer.Append("animation: {{{0}}}".FormatWith(result));
                }
            }
        }
    }
}
