function createRandomData(count) {
    var firstNames = ["Nancy", "Andrew", "Janet", "Margaret", "Steven", "Michael", "Robert", "Laura", "Anne", "Nige"],
        lastNames = ["Davolio", "Fuller", "Leverling", "Peacock", "Buchanan", "Suyama", "King", "Callahan", "Dodsworth", "White"],
        cities = ["Seattle", "Tacoma", "Kirkland", "Redmond", "London", "Philadelphia", "New York", "Seattle", "London", "Boston"],
        titles = ["Sales Representative", "Vice President, Sales", "Sales Representative", "Sales Representative", "Sales Manager", "Sales Representative", "Sales Representative", "Inside Sales Coordinator", "Sales Manager", "Vice President, Sales"],
        birthDates = [new Date("1948-12-08"), new Date("1952-02-19"), new Date("1963-08-30"), new Date("1937-09-19"), new Date("1955-03-04"), new Date("1963-07-02"), new Date("1960-05-29"), new Date("1958-01-09"), new Date("1966-01-27"), new Date("1966-03-27")];

    var data = [],
        now = new Date();
    for (var i = 0; i < count; i++) {
        var firstName = firstNames[Math.floor(Math.random() * firstNames.length)],
            lastName = lastNames[Math.floor(Math.random() * lastNames.length)],
            city = cities[Math.floor(Math.random() * cities.length)],
            title = lastNames[Math.floor(Math.random() * titles.length)],
            birthDate = birthDates[Math.floor(Math.random() * birthDates.length)],
            age = now.getFullYear() - birthDate.getFullYear();            

        data.push({
            FirstName: firstName,
            LastName: lastName,
            City: city,
            Title: title,
            BirthDate: birthDate,
            Age: age
        });
    }
    return data;
}