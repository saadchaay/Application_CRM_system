<?php

    class CategoriesController extends Controller {

        private $category ;
        public function __construct()
        {
            header('Access-Control-Allow-Origin: *');
            header('Content-Type: application/json');
            header('Access-Control-Allow-Methods: POST,GET,DELETE,PUT');
            header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');           
            $this->category = new Category();
        }

        public function index($id, $type)
        {
            $data = [
                'id' => $id,
                'type' => $type,
            ];
            $all_categories = $this->category->get_all_category($data);
            if($_SERVER["REQUEST_METHOD"] == "GET"){
                if($all_categories){
                    http_response_code(201);
                    echo json_encode($all_categories);
                }else{
                    http_response_code(404);
                    echo json_encode(array('message' => 'No categories found'));
                }
            }
        }

        public function store()
        {
            $dataJSON = json_decode(file_get_contents("php://input"));

            if($_SERVER["REQUEST_METHOD"] === "POST"){
                $data = [
                    'title' => $dataJSON->title ? $dataJSON->title : "",
                    'description' => $dataJSON->description ? $dataJSON->description : "",
                    'id_creator' => $dataJSON->id_creator ? $dataJSON->id_creator : "",
                    'type' => $dataJSON->type ? $dataJSON->type : "",
                ];

                $errors = $this->requirement($data);
                if($errors){
                    echo json_encode(array('errors' => $errors));
                }else{ 
                    $result = $this->category->create_category($data);
                    if($result){
                        http_response_code(201);
                        echo json_encode(array('message' => 'Category created'));
                    }else{
                        http_response_code(500);
                        echo json_encode(array('message' => 'Something went wrong'));
                    }
                }
            }
        }

        
    }