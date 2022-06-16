<?php 

class SheetsController extends Controller
{

    private $sheet;

    public function __construct()
    {
        header('Access-Control-Allow-Origin: *');
        header('Content-Type: application/json');
        header('Access-Control-Allow-Methods: POST,GET,DELETE,PUT');
        header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');           
        $this->sheet = new Sheet();
    }

    public function index()
    {
        $sheets = $this->sheet->get_all_sheets();
        if($_SERVER["REQUEST_METHOD"] == "GET"){
            echo json_encode($sheets);
        } else {
            http_response_code(404);
            echo json_encode(array("message" => "This method doesn't exist"));
        }
    }

    public function store()
    {
        $dataJSON = json_decode(file_get_contents("php://input"));

        if($_SERVER["REQUEST_METHOD"] == "GET"){
            echo json_encode(array("message" => "This fucking message"));
        }

        if($_SERVER["REQUEST_METHOD"] == "POST"){
            $data = [
                'id' => $dataJSON->id_admin ? $dataJSON->id_admin : "",
                'fileName' => $dataJSON->fileName ? $dataJSON->fileName : "",
                'spreadsheetId' => $dataJSON->spreadsheetId ? $dataJSON->spreadsheetId : "",
            ];
            $sheet = $this->sheet->create($data);
            if($sheet){
                http_response_code(201);
                echo json_encode(array("message" => "Sheet created"));
            } else {
                http_response_code(500);
                echo json_encode(array("errors" => "Sheet not created"));
            }
        }
    }

}