<?php 
require 'autoload.php' ;
require 'config/config.php' ;


if(isset($_GET['url'])){
    $params = explode('/', $_GET['url']);
}

if(isset($params[0]) & !empty($params[0])){
    $controller = $params[0];

    if(!is_file($params[0] . '.php')){
        // array_shift($params);
        $controller = ucfirst($params[0]) .'/'. ucfirst($params[1]);
        $file = 'controllers/' . $controller . '.php';
        array_shift($params);
        $controller = ucfirst($params[0]);
        // print_r($controller);
        if(file_exists($file)){

            require_once $file;
    
            if(class_exists($controller)){
                $obj = new $controller();
                
                if(isset($params[1]) & !empty($params[1])){
                    $action = $params[1];
    
                    if(method_exists($obj, $action)){
                        if(isset($params[2]) & !empty($params[2])){
                            $obj->$action($params[2]);
                        } else {
                            $obj->$action();
                        }
                    } else {
                        http_response_code(404);
                        echo json_encode(array("message" => "This method doesn't exist"));
                    }  
                } else {
                    http_response_code(404);
                    echo json_encode(array("message" => "This method doesn't exist"));
                }
            } else {
                http_response_code(404);
                echo json_encode(array("message" => "This class doesn't exist"));
            }
        } else {
            http_response_code(404);
            echo json_encode(array("message" => "This file doesn't exist"));
        }
    }
}


?>