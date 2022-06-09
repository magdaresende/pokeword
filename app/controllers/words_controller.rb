class WordsController < ApplicationController
    def index
        @poke = Word.last&.created_at&.today? ? Word.last : refresh
    end

    def generate_number
        rand(1...152)
    end

    def fetch_pokemon(number)
        source = "https://pokeapi.co/api/v2/pokemon/#{number}"
        client = HTTPClient.new
        content = client.get_content(source)
        pokename = JSON.parse(content)["species"]["name"]
        poketype = fetch_type(JSON.parse(content)["types"])
        {"name": pokename, "type": poketype}
    end

    def fetch_type(type_arr)
        poketype = []
        type_arr.each do |n|
            poketype << n["type"]["name"]
        end
        poketype
    end

    def refresh
        number = generate_number
        poke = fetch_pokemon(number)
        new_pokemon = Word.new(pokename: poke[:name], poketype: poke[:type])
        new_pokemon.save
        new_pokemon
    end
end
