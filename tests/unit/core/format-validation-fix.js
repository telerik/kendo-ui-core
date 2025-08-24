// Test the fix for the spreadsheet validation message issue

// Import the core to test our fix
import '@progress/kendo-ui/src/kendo.core.js';

describe("kendo.format validation message fix", function() {
    
    it("should handle normal format calls correctly", function() {
        const result = kendo.format("Hello {0} {1}", "world", "!");
        assert.equal(result, "Hello world !");
    });

    it("should fix malformed spreadsheet validation messages", function() {
        // This is the malformed input that causes the issue
        const malformedResult = kendo.format(
            "Please enter a valid {0} value {1}.", 
            "any", 
            "greater than 10,,10,,number,reject,greaterThan"
        );
        
        // Should be fixed to show the correct message
        assert.equal(malformedResult, "Please enter a valid number value greater than 10.");
    });

    it("should handle different criteria types", function() {
        const textResult = kendo.format(
            "Please enter a valid {0} value {1}.", 
            "any", 
            "containing hello,,test,,text,reject,contains"
        );
        
        assert.equal(textResult, "Please enter a valid text value containing hello.");
    });

    it("should handle date validation", function() {
        const dateResult = kendo.format(
            "Please enter a valid {0} value {1}.", 
            "any", 
            "after 2024-01-01,,2024-01-01,,date,reject,greaterThan"
        );
        
        assert.equal(dateResult, "Please enter a valid date value after 2024-01-01.");
    });

    it("should not affect normal format calls with commas", function() {
        const normalResult = kendo.format(
            "Items: {0}, Count: {1}", 
            "apple,banana,cherry", 
            "3"
        );
        
        assert.equal(normalResult, "Items: apple,banana,cherry, Count: 3");
    });

    it("should not affect calls without the specific malformed pattern", function() {
        const normalResult = kendo.format(
            "Please enter a valid {0} value {1}.", 
            "number", 
            "between 1 and 10"
        );
        
        assert.equal(normalResult, "Please enter a valid number value between 1 and 10.");
    });

});