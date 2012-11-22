require 'field'

class Component
    attr_reader :fields
    attr_accessor :name

    def initialize(name)
        @name = name
        @fields = []
    end

    def add_field(options)
        @fields.push Field.new(options[:name], options[:description])
    end
end
