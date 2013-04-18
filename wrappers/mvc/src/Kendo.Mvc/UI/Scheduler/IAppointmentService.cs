using Kendo.Mvc.UI;
using System.Collections.Generic;
using System.Linq;
using System;

namespace Kendo.Mvc.UI
{
    public interface IAppointmentService
    {
        IEnumerable<IAppointment> GetAllAppointments();
        IQueryable<IAppointment> GetAppointments(DateRange period);
        
        void Add(IAppointment appointment);
        void Update(IAppointment appointment);
        void Delete(IAppointment appointment);
    }
}
