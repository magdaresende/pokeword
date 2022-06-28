class WordsController < ApplicationController
    POKEMON_NUMBER = 151

    def index
        @poke = Word.last&.created_at&.today? ? Word.last : refresh
        @all_pokes = fetch_all_pokemon
    end

    def generate_number
        rand(1...POKEMON_NUMBER+1)
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
        if poketype.size > 1
            poketype.join(",")
        else
            poketype[0]
        end
    end

    def generate_pokemon
        number = generate_number
        fetch_pokemon(number)
    end

    def refresh
        poke = generate_pokemon
        last_20 = Word.last(20).pluck(:name)
        while last_20.include?(poke[:name])
            poke = generate_pokemon
        end
        new_pokemon = Word.new(pokename: poke[:name], poketype: poke[:type])
        new_pokemon.save
        new_pokemon
    end

    def fetch_all_pokemon
        source = "https://pokeapi.co/api/v2/pokemon?limit=#{POKEMON_NUMBER}&offset=0"
        client = HTTPClient.new
        content = client.get_content(source)
        results = JSON.parse(content)["results"]
        all_pokes = []
        results.each do |n|
            all_pokes << n["name"]
        end
        all_pokes.join(",")
    end

end
