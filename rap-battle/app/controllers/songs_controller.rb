class SongsController < ApplicationController

  def index
    Genius.access_token = GENIUS_TOKEN
    Genius.text_format = "html"
    if params[:q]
      song_to_search = params[:q]
      @song = Genius::Song.search(song_to_search)[0]
      @lyrics = Nokogiri::HTML(RestClient.get(@song.url)).css("div.lyrics").to_s
      # .xpath("//text()").to_s

    end
  end
end
