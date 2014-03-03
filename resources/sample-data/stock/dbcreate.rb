#!/usr/bin/ruby
require 'csv'

# Switch to CRLF in output
$/ = "\r\n"

DATE_FORMAT = '%d-%m-%Y'

puts %Q{
    CREATE TABLE Stock (
        [ID] INT IDENTITY(1,1) NOT NULL,
        [Symbol] VARCHAR(10) NOT NULL,
        [Date] DATETIME NOT NULL,
        [Open] DECIMAL(9,3) NOT NULL,
        [High] DECIMAL(9,3) NOT NULL,
        [Low] DECIMAL(9,3) NOT NULL,
        [Close] DECIMAL(9,3) NOT NULL,
        [Volume] BIGINT NOT NULL,

        CONSTRAINT PK_Stock PRIMARY KEY CLUSTERED (ID)
    )
    GO

    BEGIN TRANSACTION
}

CSV.foreach('data.csv', :headers => true) do |row|
    date = DateTime.strptime(row['Date'], '%Y/%m/%d')

    puts %Q{
    INSERT INTO Stock
        ([Symbol], [Date], [Open], [High], [Low], [Close], [Volume])
    VALUES
        ('BA', CONVERT(DATETIME, '#{date.strftime(DATE_FORMAT)}', 103), #{row['Open']}, #{row['High']}, #{row['Low']}, #{row['Close']}, #{row['Volume']})
    }
end

puts %Q{
    COMMIT TRANSACTION

    CREATE INDEX IX_Stock_Date
        ON Stock ([Date])
    GO

    CREATE INDEX IX_Stock_Date
        ON Stock ([Date])
    GO
}
