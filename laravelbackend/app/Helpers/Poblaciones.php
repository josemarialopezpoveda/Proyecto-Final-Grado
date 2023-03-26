<?php

namespace App\Helpers;

class Poblaciones
{
    public static function all()
    {
        $poblaciones = [];

        if (($handle = fopen(storage_path('app/poblaciones_españa.csv'), "r")) !== false) {
            $header = fgetcsv($handle, 1000, ",");
            while (($data = fgetcsv($handle, 1000, ",")) !== false) {
                $poblaciones[] = array_combine($header, $data);
            }
            fclose($handle);
        }
        return $poblaciones;




    }
}
