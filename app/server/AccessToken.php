<?php 

require __DIR__ . '/vendor/autoload.php';

$client = new \Google_Client();
$client->setApplicationName('Google Calendar API PHP Quickstart');
$client->setScopes(\Google_Service_Calendar::CALENDAR);
$client->setAuthConfig('credentials.json');
$client->setAccessType('offline');
$client->setPrompt('select_account');

define('GOOGLE_CLIENT_ID', '902170722306-736ta1oeknlfjhj0gvv4ug1ga99li3c7.apps.googleusercontent.com');
define('GOOGLE_CLIENT_SECRET', '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');
  
$config = [
    'callback' => 'http://localhost/fil_rouge_project/app/server/callback.php',
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
  
$adapter = new Hybridauth\Provider\Google( $config );
?>
