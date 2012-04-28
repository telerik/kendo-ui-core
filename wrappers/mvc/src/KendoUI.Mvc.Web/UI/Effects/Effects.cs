namespace KendoUI.Mvc.UI
{
    using System.Collections.Generic;

    public class Effects : IEffectContainer
    {
        private IList<IEffect> container;
        public Effects()
        {
            container = new List<IEffect>();
            OpenDuration = (int)AnimationDuration.Fast;
            CloseDuration = (int)AnimationDuration.Fast;
        }

        public IList<IEffect> Container 
        {
            get 
            {
                return this.container;
            }
        }

        public int OpenDuration
        {
            get;
            set;
        }

        public int CloseDuration
        {
            get;
            set;
        }
    }
}