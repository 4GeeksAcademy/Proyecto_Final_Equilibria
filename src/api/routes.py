"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, FavoriteQuote, Entrada
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_bcrypt import Bcrypt 
from flask_jwt_extended import  JWTManager, create_access_token, jwt_required, get_jwt_identity
import os
import openai
import json
import re

api = Blueprint('api', __name__)
openai.api_key = os.getenv("OPENAI_API_KEY")

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
        gender= request.json.get('gender')
        is_admin = request.json.get('is_admin', False) in [True, "true", "True"]
        if not email or not password or not name :
            return jsonify({'e': 'Email, Password and Name are required.'}), 400
        
        existe_usuario= User.query.filter_by(email=email).first()
        
        if existe_usuario:
            return jsonify({'error': 'email already exists'})
        
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        new_user = User(email=email, password=hashed_password, name=name, is_admin=is_admin, gender=gender)   
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

# @api.route('/favorite-quotes', methods=['POST'])
# @jwt_required()
# def handle_create_favorite_quote():
#     try:
#         current_user = get_jwt_identity()
#         quote_text = request.json.get('quote_text')
#         author = request.json.get('author')

#         if not quote_text or not author:
#             return jsonify({'error': 'Quote text and author are required'}), 400

#         new_favorite = FavoriteQuote(user_id=current_user, quote_text=quote_text, author=author)
#         db.session.add(new_favorite)
#         db.session.commit()

#         return jsonify(new_favorite.serialize()), 201
#     except Exception as e:
#         db.session.rollback()
#         return jsonify({'error': str(e)}), 500

@api.route('/favorite', methods=['POST'])
@jwt_required()
def create_favorite_quote():
    try:
        current_user = get_jwt_identity()
        type = request.json.get('type', '')
        quote_text = request.json.get('quote_text', '')
        author = request.json.get('author', '')
        title = request.json.get('title', '')
        description = request.json.get('description', '')
        url = request.json.get('url', '')

        if not type or not quote_text or not author:
            return jsonify({'error': 'Type, quote text and author are required'}), 400

        new_favorite = FavoriteQuote(user_id=current_user, type=type, quote_text=quote_text, author=author, title=title, description=description, url=url)
        db.session.add(new_favorite)
        db.session.commit()

        return jsonify(new_favorite.serialize()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@api.route('/favorite-del', methods=['DELETE'])
@jwt_required()
def delete_favorite_quote():
    try:
        favorite_id = request.json.get('favorite_id')
        # type= request.json.get('type')
        if not favorite_id:
            return jsonify({'error': 'Favorite ID or type is required'}), 400
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
    
@api.route('/entrada', methods=['POST'])
@jwt_required()
def create_diary_entry():
    try:
        current_user = get_jwt_identity()
        mood_tag = request.json.get('mood_tag')
        entry_text = request.json.get('entry_text')

        
        if not mood_tag or not entry_text:
            return jsonify({'error': 'Fecha, mood_tag, and texto are required'}), 400

       
        new_entry = Entrada(user_id=current_user, mood_tag=mood_tag, entry_text=entry_text)
        db.session.add(new_entry)
        db.session.commit()

        return jsonify(new_entry.serialize()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
    

@api.route('/consejo-personalizado', methods=['POST'])
@jwt_required()
def get_personalized_advice():
    try:
        current_user = get_jwt_identity()
        user = User.query.get(current_user)
        if not user:
            return jsonify({'error': 'User not found'}), 404
        gender = user.gender
        mood_tag = request.json.get('mood_tag')
        
        prompt_comportamiento = "Actúa como un coach motivacional empático y profesional. " \
        "Quiero que brindes un consejo inspirador y cálido para una persona que está atravesando una etapa emocional particular. " \
        f"Basándote en el estado de ánimo etiquetado como: '{mood_tag}', responde con un mensaje que transmita motivación, acompañamiento y fuerza interior. " \
        "El consejo debe ser humano, sincero y alentador. " \
        "Evita frases genéricas. Habla con sensibilidad, como si quisieras levantarle el ánimo con palabras que realmente conecten. " \
        "No uses un tono frío ni condescendiente. " \
        "El mensaje debe ser breve (máx. 150 palabras) y emocionalmente significativo. " \
        f"Solo usa el género de la persona si es necesario para dar mayor calidez. El género es: '{gender}'."


        if not mood_tag:
            return jsonify({'error': 'Mood tag and entry text are required'}), 400

        prompt = f"{prompt_comportamiento}."
        
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "user", "content": prompt}
            ]
        )

        advice = response['choices'][0]['message']['content']
        return jsonify({'advice': advice}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@api.route('/frase-motivacional', methods=['POST'])
@jwt_required()
def get_quote():
    try:
        current_user = get_jwt_identity()
        user = User.query.get(current_user)
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        prompt_comportamiento = """
Genera una frase motivacional breve y poderosa junto con su autor. Devuélvela únicamente como un JSON con las siguientes claves:

{
    "quote": "Tu frase aquí",
    "author": "Nombre del autor"
}

Evita rodeos, explicaciones o texto adicional. El resultado debe estar 100% en formato JSON válido. No inventes autores si no los conocés.
"""

        prompt = f"{prompt_comportamiento}."
        
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "user", "content": prompt}
            ]
        )

        advice = response['choices'][0]['message']['content']
        advice_json = json.loads(advice)
        return jsonify(advice_json), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@api.route('/frases-motivacionales', methods=['POST'])
@jwt_required()
def get_quotes():
    try:
        current_user = get_jwt_identity()
        user = User.query.get(current_user)
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        prompt_comportamiento = """
Genera 9 frases motivacionales breves y poderosas junto con su autor. Devuélvelas únicamente como un JSON con las siguientes claves:
[
    {
        "quote": "Tu frase aquí",
        "author": "Nombre del autor"
    },
    {
        "quote": "Tu frase aquí",
        "author": "Nombre del autor"
    }
]
Evita rodeos, explicaciones o texto adicional. El resultado debe estar 100% en formato JSON válido. No inventes autores si no los conocés.
"""

        prompt = f"{prompt_comportamiento}."
        
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "user", "content": prompt}
            ]
        )

        advice = response['choices'][0]['message']['content']

        match = re.search(r"\[.*\]", advice, re.DOTALL)
        if not match:
            return jsonify({"error": "No se encontró un JSON válido en la respuesta"}), 500
        
        json_string = match.group(0)
        advice_json = json.loads(json_string)
        return jsonify(advice_json), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@api.route('/recomendaciones', methods=['POST'])
@jwt_required()
def get_recommendations():
    try:
        current_user = get_jwt_identity()
        user = User.query.get(current_user)
        busqueda_text = request.json.get('busqueda', '')
        if busqueda_text:
            prompt_comportamiento = f"""
Genera 5 recomendaciones útiles basadas en la siguiente necesidad o estado: "{busqueda_text}". 
Las recomendaciones pueden incluir películas, series, ejercicios de respiración, prácticas de mindfulness, libros o podcasts.

Devuélvelas únicamente como un arreglo JSON con el siguiente formato:
[
    {{
        "type": "Tipo de contenido (película, serie, ejercicio, podcast, libro)(solo las opciones que se mencionan)",
        "title": "Título o nombre de la recomendación",
        "description": "Descripción breve y clara de la recomendación"
        "url": "URL de la recomendación (si corresponde, de lo contrario, poner N/A)"
    }},
    {{
        "type": "Tipo de contenido (película, serie, ejercicio, podcast, libro)(solo las opciones que se mencionan)",
        "title": "Título o nombre de la recomendación",
        "description": "Descripción breve y clara de la recomendación"
        "url": "URL de la recomendación (si corresponde, de lo contrario, poner N/A)"
    }}
]

No incluyas ningún texto fuera del JSON. No inventes datos si no los conocés.
El resultado debe estar 100% en formato JSON válido.
"""

        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        prompt = f"{prompt_comportamiento}."

        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "user", "content": prompt }
            ]
        )
        advice = response['choices'][0]['message']['content']
        match = re.search(r"\[.*\]", advice, re.DOTALL)
        if not match:
            return jsonify({"error": "No se encontró un JSON válido en la respuesta"}), 500
        json_string = match.group(0)
        advice_json = json.loads(json_string)
        return jsonify(advice_json), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@api.route('/signup-admin', methods=['POST'])
# @jwt_required()
def create_admin():
    try:
        email = request.json.get('email')
        password = request.json.get('password')
        name = request.json.get('name')
        gender= request.json.get('gender')
        is_admin = request.json.get('is_admin', True) in [True, "true", "True"]
        if not email or not password or not name :
            return jsonify({'e': 'Email, Password and Name are required.'}), 400
        
        existe_usuario= User.query.filter_by(email=email).first()
        
        if existe_usuario:
            return jsonify({'error': 'email already exists'})
        
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        new_user = User(email=email, password=hashed_password, name=name, is_admin=is_admin, gender=gender)   
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'message': 'User created successfully'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@api.route('/admin/users', methods=['GET'])
@jwt_required()
def get_all_users():
    try:
        current_user = get_jwt_identity()
        user = User.query.get(current_user)
        if not user:
            return jsonify({'error': 'User not found'}), 404
        if not user.is_admin:
            return jsonify({'error': 'Unauthorized access'}), 403

        name_filter = request.args.get('name', None)
        email_filter = request.args.get('email', None)
        is_admin_filter = request.args.get('is_admin', None)
        is_active_filter = request.args.get('is_active', None)
        

        query = User.query
        if is_admin_filter:
            if is_admin_filter.lower() == "true":
                query = query.filter(User.is_admin.is_(True))
            elif is_admin_filter.lower() == "false":
                query = query.filter(User.is_admin.is_(False))
        if is_active_filter:
            if is_active_filter.lower() == "true":
                query = query.filter(User.is_active.is_(True))
            elif is_active_filter.lower() == "false":
                query = query.filter(User.is_active.is_(False))
        if name_filter:
            query = query.filter(User.name.ilike(f"%{name_filter}%"))
        if email_filter:
            query = query.filter(User.email.ilike(f"%{email_filter}%"))

        users = query.all()
        users_list = [user.serialize() for user in users]

        return jsonify(users_list), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@api.route('/admin/force-reset-password', methods=['PATCH'])
@jwt_required() 
def force_reset_password():
    try:
        current_user = get_jwt_identity()
        user = User.query.get(current_user)
        if not user:
            return jsonify({'error': 'User not found'}), 404
        if not user.is_admin:
            return jsonify({'error': 'Unauthorized access'}), 403
        user_id = request.json.get('user_id')
        if not user_id:
            return jsonify({'error': 'User ID is required'}), 400
        user_to_reset = User.query.get(user_id)
        if not user_to_reset:
            return jsonify({'error': 'User not found'}), 404
        user_to_reset.force_password_change = True
        db.session.commit()
        return jsonify({'message': 'Password reset forced successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
    
 
@api.route('/user/change-password', methods=['PATCH'])
@jwt_required()
def change_password():
    try:
        current_user = get_jwt_identity()
        user = User.query.get(current_user)
        if not user:
            return jsonify({'error': 'User not found'}), 404
        user_id = request.json.get('user_id')
        new_password = request.json.get('new_password')
        if not user_id or not new_password:
            return jsonify({'error': 'User ID and new password are required'}), 400
        user_to_change = User.query.get(user_id)
        if not user_to_change:
            return jsonify({'error': 'User not found'}), 404
        user_to_change.force_password_change = False
        hashed_password = bcrypt.generate_password_hash(new_password).decode('utf-8')
        user_to_change.password = hashed_password
        db.session.commit()
        return jsonify({'message': 'Password changed successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@api.route('/admin/suspender-activar-user', methods=['PATCH'])
@jwt_required() 
def suspender_activar_user():
    try:
        current_user = get_jwt_identity()
        user = User.query.get(current_user)
        if not user:
            return jsonify({'error': 'User not found'}), 404
        if not user.is_admin:
            return jsonify({'error': 'Unauthorized access'}), 403
        user_id = request.json.get('user_id')
        if not user_id:
            return jsonify({'error': 'User ID is required'}), 400
        user_to_change = User.query.get(user_id)
        if not user_to_change:
            return jsonify({'error': 'User not found'}), 404
        user_to_change.is_active = not user_to_change.is_active
        db.session.commit()
        return jsonify({'message': 'tarea lograda con exito'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@api.route('/admin/hacer-deshacer-admin', methods=['PATCH'])
@jwt_required()
def make_remove_admin():
    try:
        current_user = get_jwt_identity()
        user = User.query.get(current_user)
        if not user:
            return jsonify({'error': 'User not found'}), 404
        if not user.is_admin:
            return jsonify({'error': 'Unauthorized access'}), 403
        user_id = request.json.get('user_id')
        if not user_id:
            return jsonify({'error': 'User ID is required'}), 400
        user_to_admin = User.query.get(user_id)
        if not user_to_admin:
            return jsonify({'error': 'User not found'}), 404
        user_to_admin.is_admin = not user_to_admin.is_admin
        db.session.commit()
        return jsonify({'message': 'tarea lograda con exito'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@api.route('/diario', methods=['GET'])
@jwt_required()
def get_diary_entries():
    try:
        current_user = get_jwt_identity()
        entries = Entrada.query.filter_by(user_id=current_user).all()
        entries_list = [entry.serialize() for entry in entries]

        if not entries:
            return jsonify({'error': 'No diary entries found for this user'}), 404

        return jsonify(entries_list), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500 