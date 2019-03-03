#!/usr/bin/env ruby

require 'json'

class ConvertToJson
  def self.convert(file_name = "JimRohn.md" )
    new(file_name).convert
  end

  def initialize(file_name)
    @file_name = file_name
  end

  attr_reader :file_name

  def convert
    start_at = Time.now

    lines = filestream.readlines
    concat_lines = concat_lines(lines)
    write_json(concat_lines.shuffle)
    finished_at = Time.now

    $stdout << "*** Done! Finishing in #{ finished_at - start_at }.\n*** Total quotes is #{ concat_lines.length }\nExitting.\n"
  end

  def write_json(concat_lines)
    output_file = file_name.split(".")[0] + ".json"
    path = File.join(__dir__, output_file)

    File.open(path, "w+") do |f|
      f << JSON.generate(jsonize(concat_lines))
    end
  end

  def jsonize(concat_lines)
    {
      quotes: concat_lines.map do |line|
        {
          body: line.gsub("\n", ""),
          author: "Jim Rohn"
        }
      end
    }
  end

  def concat_lines(lines)
    sentence = ""

    concat_lines = []

    lines.each do |line|
      if line != "\n"
        sentence << " "
        sentence << line
      else
        concat_lines << sentence
        sentence = ""
      end
    end

    concat_lines
  end

  def filestream
    path = File.join(__dir__, file_name)
    File.open(path, "r")
  end
end

ConvertToJson.convert
