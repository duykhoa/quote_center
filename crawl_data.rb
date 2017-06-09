#!/usr/bin/env ruby

require 'net/http'
require 'byebug'
require 'json'

class RequestMaker
  attr_reader :uri, :headers

  def initialize(uri, headers)
    @uri = uri
    @headers = headers
  end

  def call
    request = Net::HTTP::Get.new uri
    set_headers(request, headers)

    Net::HTTP.start(uri.host, uri.port, :use_ssl => uri.scheme == 'https') do |http|
      http.request(request)
    end
  end

  def set_headers(request, headers)
    headers.each { |k,v| request[k] = v }
  end
end

class CrawlData
  ENDPOINT = "https://favqs.com/api/quotes"
  OUTPUT_DIR = "./data"
  LIMIT_TIMES = 25
  LAST_PAGE_KEY = "last_page"
  QUOTE_KEY = "quotes"

  def initialize(query = default_query, output_file = "output.json")
    @query = query
    @output_file = output_file
  end

  def call(page = 1)
    puts "**recall, page=#{page}"

    uri = URI(ENDPOINT)

    uri.query = paginage(@query, page)
    response = RequestMaker.new(uri, headers).()

    parsed_response = JSON.parse(response.body)

    if parsed_response[LAST_PAGE_KEY] || page >= LIMIT_TIMES
      append_response parsed_response[QUOTE_KEY]
      store_response(quotes)
    else
      append_response parsed_response[QUOTE_KEY]

      call(page + 1)
    end
  end

  def paginage(query, page)
    query + "&page=#{page}"
  end

  def quotes
    @quotes ||= []
  end

  def append_response(_quotes)
    quotes.concat  _quotes
  end

  def headers
    {
      'Authorization' => 'Token token="23481bf9060abdefd284c480c765b361"'
    }
  end

  def store_response(response)
    json_response = JSON.generate(quotes: response)
    File.open(output_path, "w+") { |f| f << json_response }
  end

  def output_path
    File.join(OUTPUT_DIR, @output_file)
  end
end

query = 'filter=Jim+Rohn&type=author'
output_file = "JimRohn.json"

CrawlData.new(query, output_file).call
