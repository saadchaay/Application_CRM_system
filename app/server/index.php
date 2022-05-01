<?php 

require 'autoload.php' ;
require 'config/config.php' ;


if(isset($_GET['url'])){
    $params = explode('/', $_GET['url']);
}

if(isset($params[0]) & !empty($params[0])){
    $controller = ucfirst($params[0]);
    $file = 'controllers/'. $controller .'.php' ;

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
                    echo "<h3>This method doesn't exist</h3>";
                }  
            } else {
                http_response_code(404);
                echo "<h3>This method doesn't exist</h3>";
            }
        } else {
            http_response_code(404);
            echo "<h3>This class doesn't exist</h3>";
        }
    } else {
        http_response_code(404);
        echo "<h3>This file doesn't exist</h3>";
    }
}

?>