"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
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
        is_active = request.json.get('is_active')
        name = request.json.get('name')
        if not email or not password or not is_active:
            return jsonify({'e': 'Email, password and Name are required.'}), 400
        
        existe_usuario= User.query.filter_by(email=email).first()
        
        if existe_usuario:
            return jsonify({'error': 'email already exists'})
        
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        new_user = User(email=email, password=hashed_password, is_active=is_active, name=name)   
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