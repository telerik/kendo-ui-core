#!/usr/bin/env ruby

require 'rubygems'
require 'yajl'

contents = Yajl::Parser.parse(File.read("menu.json"))

contents.each do |item|
    item["stats"] = {
        "protein" => rand * 3,
        "fat" => rand * 3,
        "carbohydrate" => rand * 10,
        "energy" => rand * 30,
        "sugar" => rand / 2
    }

    item["stats"].each do |key, value|
        item["stats"][key] = (value * 10000).ceil.to_f / 10000
    end
end

File.open("menu.json", "w") do |f|
    f.write Yajl::Encoder.encode(contents, :pretty => true)
end
puts
