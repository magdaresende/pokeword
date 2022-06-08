class WordsController < ApplicationController
    def index
        last_word = Word.last
        @word =last_word&.created_at&.today? ? last_word.name : refresh
    end

    def generate_number
        rand(1...152)
    end

    def fetch_pokemon(number)
        source = "https://pokeapi.co/api/v2/pokemon/#{number}"
        client = HTTPClient.new
        content = client.get_content(source)
        JSON.parse(content)["species"]["name"]
    end

    def refresh
        number = generate_number
        word = fetch_pokemon(number)
        new_pokemon = Word.new(name: word)
        new_pokemon.save
        new_pokemon.name
    end
end
