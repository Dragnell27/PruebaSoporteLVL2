<?php

namespace App\Http\Controllers;

use App\Models\City;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class CityController extends Controller
{
    // Trae todas las ciudades
    public function show_cities()
    {
        try {
            // Realiza la consulta para traer todas las ciudades
            $cities = City::all();

            //retorna los datos en formato json
            return response()->json([
                'success' => true,
                'message' => 'Datos consultados correctamente',
                'data'    => $cities,
            ], 200);
        } catch (\Exception $e) {
            // Retorna respuesta de error en caso de excepción
            return response()->json([
                'success' => false,
                'message' => 'Error al consultar los datos: ' . $e->getMessage(),
                'data'    => null,
            ], 500);
        }
    }

    // Calcula la información referente a moneda y clima recibida
    public function responseInfo(Request $request)
    {
        try {
            // Asigno las variables recibidas en el request
            $city = City::where('id',$request->city)->first();
            $budget = $request->budget;

            //Realizo peticiones Http a las APIs de clima y moneda
            $responseCoin = Http::get('https://v6.exchangerate-api.com/v6/9ab10f61335934c83a941b45/latest/COP');
            $responseClimate = Http::get('https://api.openweathermap.org/data/2.5/weather?q=' . $city->name . '&APPID=ccf0fc35228f8ff018716c7e55fb5814&units=metric');

            //Si ocurre algún error al enviar las peticiones APIs retorna error 400
            if ($responseCoin->successful() && $responseClimate->successful()) {

                //Convierto la información retornada de las APIs en json
                $dataCoin = $responseCoin->json();
                $dataClimate = $responseClimate->json();

                //Almaceno toda la información relevante en variables
                $rate = $dataCoin['conversion_rates'][$city->currency_code];
                $icon = $dataClimate['weather'][0]['icon'];
                $temp = $dataClimate['main']['temp'];

                //formateo la información que sera enviada al frontend
                $data = [
                    'symbol' => $city->currency_symbol,
                    'code' => $city->currency_code,
                    'name' => $city->currency_name,
                    'city' => $city->name,
                    'budgetFinal' => round($rate * $budget, 3),
                    'exchangeRate' => $rate,
                    'temp' => $temp,
                    'budget' => $budget,
                    'icon' => 'http://openweathermap.org/img/wn/' . $icon . '.png',
                ];

                return response()->json([
                    'success' => true,
                    'message' => 'Datos consultados correctamente',
                    'data'    => $data
                ],200);
            }else{
                return response()->json([
                    'success' => false,
                    'message' => 'Ocurrió un error al consultar APIs externas',
                    'data'    => null,
                ], 500);
            }
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al consultar los datos: ' . $e->getMessage(),
                'data'    => null,
            ], 500);
        }
    }
}
