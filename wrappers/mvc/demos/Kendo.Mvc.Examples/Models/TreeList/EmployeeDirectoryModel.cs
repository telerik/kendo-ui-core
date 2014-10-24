namespace Kendo.Mvc.Examples.Models.TreeList
{
    using System;

    public class EmployeeDirectoryModel
    {
        public int EmployeeId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int? ReportsTo { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string Phone { get; set; }
        public int? Extension { get; set; }
        public string Position { get; set; }

        private DateTime? birthDate;
        public DateTime? BirthDate
        {
            get
            {
                return birthDate;
            }
            set
            {
                if (value.HasValue)
                {
                    birthDate = value.Value;
                }
                else
                {
                    birthDate = null;
                }
            }
        }


        private DateTime? hireDate;
        public DateTime? HireDate
        {
            get
            {
                return hireDate;
            }
            set
            {
                if (value.HasValue)
                {
                    hireDate = value.Value;
                }
                else
                {
                    hireDate = null;
                }
            }
        }

        public EmployeeDirectory ToEntity()
        {
            return new EmployeeDirectory
            {
                EmployeeID = EmployeeId,
                FirstName = FirstName,
                LastName = LastName,
                ReportsTo = ReportsTo,
                Address = Address,
                City = City,
                Country = Country,
                Phone = Phone,
                Extension = Extension,
                Position = Position,
                HireDate = HireDate,
                BirthDate = BirthDate
            };
        }
    }
}