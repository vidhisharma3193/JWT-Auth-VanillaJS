class ApplicationController < ActionController::API

    before_action :logged_in?

    def encode_token(payload)
        JWT.encode(payload, "Yale2020")
        # JWT.encode(payload, "Yale2020", "HS256")
    end

    def logged_in?
        # byebug

        headers = request.headers["Authorization"]
        token = headers.split(" ")[1]

        begin
            user_id = JWT.decode(token, "Yale2020")[0]["user_id"]
            user = User.find(user_id)
        rescue 
            user = nil
        # ensure
            #always runs with an error or without
        end

        render json: {error: "Please LogIn"} unless user
    end
end
