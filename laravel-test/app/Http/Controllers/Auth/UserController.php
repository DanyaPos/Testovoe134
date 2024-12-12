<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function register(Request $request)
    {
        // Валидация
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        // Если валидация возвращает false, то возвращаем ошибку с кодом 400
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        // Создаём пользователя, пароль хэшируем
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Создали JWT токен
        $token = JWTAuth::fromUser($user);


        //Возвращаем запрос с кодом 201 если всё успешно
        return response()->json([
            'message' => 'Пользователь успешно зарегистрировался',
            'token' => $token
        ], 201);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        // Если валидация не прошла, возвращаем ошибки
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        // Попытка аутентификации пользователя
        if (!$token = JWTAuth::attempt($request->only('email', 'password'))) {
            return response()->json(['message' => 'Неверные учетные данные'], 401);
        }

        // Возвращаем токен при успешном входе
        return response()->json([
            'message' => 'Успешный вход',
            'token' => $token
        ]);
    }
}

