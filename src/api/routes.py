"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, FavoriteQuote
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_bcrypt import Bcrypt 
from flask_jwt_extended import  JWTManager, create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

jwt = JWTManager()  
bcrypt = Bcrypt()

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/user', methods=['POST'])
def handle_create_user():
    try:
        email = request.json.get('email')
        password = request.json.get('password')
        name = request.json.get('name')
        if not email or not password or not name :
            return jsonify({'e': 'Email, Password and Name are required.'}), 400
        
        existe_usuario= User.query.filter_by(email=email).first()
        
        if existe_usuario:
            return jsonify({'error': 'email already exists'})
        
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        new_user = User(email=email, password=hashed_password, name=name)   
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'message': 'User created successfully'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
    
@api.route('/login', methods=['POST'])
def login():
    try:
        email = request.json.get('email')
        password = request.json.get('password')
        if not email or not password:
            return jsonify({'e': 'Email and password are required.'}), 400
       
        usuario= User.query.filter_by(email=email).one()
        
        if not usuario:
            return jsonify({'error': 'El email no esta registrado.'})
        
        password_guardada_en_db = usuario.password 
        password_correcta= bcrypt.check_password_hash(password_guardada_en_db, password)

        if password_correcta:
            id_usuario = usuario.id
            token = create_access_token(identity = str(id_usuario))
            return jsonify({'token': token}), 200
        else:
            return jsonify({'e':'la contrasenna no es correcta.'}), 404
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
    
@api.route('/user', methods=['GET'])
@jwt_required()
def handle_get_user():
    try:
        
        current_user = get_jwt_identity()
        user = User.query.get(current_user)

        if not user:
            return jsonify({'error': 'User not found'}), 404
        return jsonify(user.serialize()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@api.route('/favorite-quotes', methods=['GET'])
@jwt_required()
def handle_favorite_quotes():
    try:
        current_user = get_jwt_identity()
        favorites = FavoriteQuote.query.filter_by(user_id = current_user).all()
        favorites_list = [item.serialize() for item in favorites]

        if not favorites:
            return jsonify({'error': 'There are no favorites for this user', 'user' : current_user}), 404

        return favorites_list

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@api.route('/favorite-quotes', methods=['POST'])
@jwt_required()
def handle_create_favorite_quote():
    try:
        current_user = get_jwt_identity()
        quote_text = request.json.get('quote_text')
        author = request.json.get('author')

        if not quote_text or not author:
            return jsonify({'error': 'Quote text and author are required'}), 400

        new_favorite = FavoriteQuote(user_id=current_user, quote_text=quote_text, author=author)
        db.session.add(new_favorite)
        db.session.commit()

        return jsonify(new_favorite.serialize()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@api.route('/favorite-quotes/<int:favorite_id>', methods=['DELETE'])
@jwt_required()
def delete_favorite_quote(favorite_id):
    try:
        current_user = get_jwt_identity()
        favorite_to_delete = FavoriteQuote.query.filter_by(id=favorite_id, user_id=current_user).first()

        if not favorite_to_delete:
            return jsonify({'msg': 'Favorite quote not found for this user'}), 404

        db.session.delete(favorite_to_delete)
        db.session.commit()

        return jsonify({'msg': 'Favorite quote successfully deleted'}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500