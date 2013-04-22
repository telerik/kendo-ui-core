using System.Linq;

namespace Kendo.Mvc.UI
{
    public interface ISchedulerEventService
    {
        IQueryable<ISchedulerEvent> Read(DateRange period);

        void Create(ISchedulerEvent appointment);
        void Update(ISchedulerEvent appointment);
        void Destroy(ISchedulerEvent appointment);
    }
}
