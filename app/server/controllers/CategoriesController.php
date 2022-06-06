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
                    'id_creator' => $dataJSON->id_creator ? $dataJSON->id_creator : "",
                    'type' => $dataJSON->type ? $dataJSON->type : "",
                    'title' => $dataJSON->title ? $dataJSON->title : "",
                    'description' => $dataJSON->description ? $dataJSON->description : "",
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

        public function update($id)
        {
            $dataJSON = json_decode(file_get_contents("php://input"));

            if($_SERVER["REQUEST_METHOD"] === "PUT"){
                $data = [
                    'id_creator' => $dataJSON->id_creator ? $dataJSON->id_creator : "",
                    'type' => $dataJSON->type ? $dataJSON->type : "",
                    'title' => $dataJSON->title ? $dataJSON->title : "",
                    'description' => $dataJSON->description ? $dataJSON->description : "",
                ];

                $errors = $this->requirement($data);
                if($errors){
                    echo json_encode(array('errors' => $errors));
                }else{ 
                    $result = $this->category->update_category($id, $data);
                    if($result){
                        http_response_code(201);
                        echo json_encode(array('message' => 'Category updated'));
                    }else{
                        http_response_code(500);
                        echo json_encode(array('message' => 'Something went wrong'));
                    }
                }
            }
        }

        public function destroy($id)
        {
            
            $result = $this->category->delete_category($id);
            if($result){
                http_response_code(201);
                echo json_encode(array('message' => 'Category deleted'));
            }else{
                http_response_code(500);
                echo json_encode(array('message' => 'Something went wrong'));
            }
        }

        
    }