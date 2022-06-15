<?php 
require 'autoload.php' ;
require 'config/config.php' ;
require_once __DIR__ . '/vendor/autoload.php';

    $controller = "Pages";
    $method = "home";
    $params = [];

    function getUrl()
    {
        if(isset($_GET['url'])) {
            $url = rtrim($_GET['url'],'/');
            $url = filter_var($url, FILTER_SANITIZE_URL);
            $url = explode('/', $url);
            return $url;
        }
    }

    $url = getUrl(); 
    
    

    if(isset($url[0])){
        if(is_file("controllers/$url[0].php")){
            if(file_exists('controllers/'.ucwords($url[0]).'.php')){
                $controller = ucwords($url[0]) ;
                $file = 'controllers/' . $controller . '.php';
                unset($url[0]);
            }
            require_once $file ;
            $controller = new $controller ;
        
            if(isset($url[1])) {
                if(method_exists($controller, $url[1])){
                    $method = $url[1];
                    unset($url[1]);
                }
            }
        
            $params = $url ? array_values($url):[];
        
            call_user_func_array([$controller, $method], $params);
        } else {
            if(file_exists('controllers/'.ucwords($url[0]).'/'.ucwords($url[1]).'.php')){
                $controller = ucwords($url[1]) ;
                $file = 'controllers/'.ucwords($url[0]).'/'. $controller . '.php';
                unset($url[0]);
                unset($url[1]);
            }
            require_once $file ;
            $controller = new $controller ;
        
            if(isset($url[2])) {
                if(method_exists($controller, $url[2])){
                    $method = $url[2];
                    unset($url[2]);
                }
            }
        
            $params = $url ? array_values($url):[];
        
            call_user_func_array([$controller, $method], $params);
        } 
    }
    













































// if(isset($_GET['url'])){
//     $params = explode('/', $_GET['url']);
// }

// if(isset($params[0]) & !empty($params[0])){
//     $controller = $params[0];
    
    
//     if(!is_file("controllers/$params[0].php")){
//         // array_shift($params);
//         $controller = ucfirst($params[0]) .'/'. ucfirst($params[1]);
//         $file = 'controllers/' . $controller . '.php';
//         array_shift($params);
//         $controller = ucfirst($params[0]);
//         // print_r($controller);
//         if(file_exists($file)){

//             require_once $file;
    
//             if(class_exists($controller)){
//                 $obj = new $controller();
                
//                 if(isset($params[1]) & !empty($params[1])){
//                     $action = $params[1];
    
//                     if(method_exists($obj, $action)){
//                         if(isset($params[2]) & !empty($params[2])){
//                             $obj->$action($params[2]);
//                         } else {
//                             $obj->$action();
//                         }
//                     } else {
//                         http_response_code(404);
//                         echo json_encode(array("message" => "This method doesn't exist"));
//                     }  
//                 } else {
//                     http_response_code(404);
//                     echo json_encode(array("message" => "This method doesn't exist"));
//                 }
//             } else {
//                 http_response_code(404);
//                 echo json_encode(array("message" => "This class doesn't exist"));
//             }
//         } else {
//             http_response_code(404);
//             echo json_encode(array("message" => "This file doesn't exist"));
//         }
//     } else {
//         $file = 'controllers/'. $controller .'.php' ;

//         if(file_exists($file)){
//             require_once $file;
    
//             if(class_exists($controller)){
//                 $obj = new $controller();
                
//                 if(isset($params[1]) & !empty($params[1])){
//                     $action = $params[1];
    
//                     if(method_exists($obj, $action)){
//                         if(isset($params[2]) & !empty($params[2])){
//                             $obj->$action($params[2], $params[3] ? $params[3] : "");
//                         } else {
//                             $obj->$action();
//                         }
//                     } else {
//                         http_response_code(404);
//                         echo "<h3>This method doesn't exist</h3>";
//                     }  
//                 } else {
//                     http_response_code(404);
//                     echo "<h3>This method doesn't exist</h3>";
//                 }
//             } else {
//                 http_response_code(404);
//                 echo "<h3>This class doesn't exist</h3>";
//             }
//         }
//     }
// }
