<?php 

require __DIR__ . "../../../vendor/autoload.php";

define('GOOGLE_CLIENT_ID', '902170722306-736ta1oeknlfjhj0gvv4ug1ga99li3c7.apps.googleusercontent.com');
define('GOOGLE_CLIENT_SECRET', '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');

    
    class TokenConfig {

        private $adapter;

        public function __construct()
        {
            $this->adapter = new AccessToken();
        }
        
        public function config()
        {
            
            $config = [
                'callback' => $this->callback(),
                'keys'     => [
                                'id' => GOOGLE_CLIENT_ID,
                                'secret' => GOOGLE_CLIENT_SECRET
                            ],
                'scope'    => 'https://www.googleapis.com/auth/spreadsheets',
                'authorize_url_parameters' => [
                        'approval_prompt' => 'force', // to pass only when you need to acquire a new refresh token.
                        'access_type' => 'offline'
                ]
            ];
            
            return $config;
        }

        public function callback()
        {
            $adapter = new \Hybridauth\Provider\Google( $this->config() );
            try {
                $adapter->authenticate();
                $token = $adapter->getAccessToken();
                $db = new DB();
                $db->update_access_token(json_encode($token));
                echo "Access token inserted successfully.";
            }
            catch( Exception $e ){
                echo $e->getMessage() ;
            }
        }

    }
