Rails.application.routes.draw do
  root 'words#index'
  get '/refresh', to: 'words#refresh'

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
