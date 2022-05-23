<?php
    return [

        'email' => '/^[a-zA-Z0-9]*$/',
        'password' => '/^(.{0,7}|[^a-z]*|[^\d]*)$/i',
        'name' => '/^([a-zA-Z' . "'" . ' ]+)$/',
        'phone' => '/^[0-9]*$/',
        'username' => '/^[a-zA-Z0-9]*$/',
        'confirmPassword' => '/^(.{0,7}|[^a-z]*|[^\d]*)$/i',
    ];

?>