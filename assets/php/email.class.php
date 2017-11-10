<?php
//www.resellscripts.info
define('IS_AJAX', isset( $_SERVER['HTTP_X_REQUESTED_WITH'] ) && $_SERVER['HTTP_X_REQUESTED_WITH'] === 'XMLHttpRequest');
class Email extends Protector {

    public function init(){

          if($this->finish()){
                $mail = $this->phpmailer();
                $mail = new PHPMailer(true);
                $mail->IsHTML(true);

                try{
                    $mail->Body = $this->body();
                    $mail->Subject = $this->subject();
                    $mail->From = $this->from('email');
                    $mail->FromName = $this->from('name');

                    /** SMTP OPTIONS **/

                    if($this->smtp['use'] != 'no'){
                        $mail->IsSMTP();
                        $mail->Host = $this->smtp['host'];
                        $mail->Port = $this->smtp['port'];
                        $mail->SMTPSecure = $this->smtp['secure'];
                        if($this->smtp['auth'] != 'no'){
                            $mail->SMTPAuth = true;
                            $mail->Username = $this->smtp['username'];
                            $mail->Password = $this->smtp['password'];
                        }
                    }
                    // Adds Addresses

                    foreach($this->Address as $Address){
                        if(!empty($Address))
                            $mail->AddAddress($Address);
                    }


                    $mail->CharSet = $this->charset;
                    $email = $mail->Send();
                    if($email){
                       if($this->isAjax()){
                            //exit script outputting json data
                            $output = json_encode(array('type'=>'message', 'text' => 'Ваше сообщение успешно отправлено'));
                            echo $output;
                        }else{
                            echo $this->msg['success'];  
                        }
                    }
                }
                catch(Exception $e){
                       if($this->isAjax()){
                            $output = json_encode(array('type'=>'error', 'text' => 'Ваше сообщение не отправлено!'));
                            echo $output;
                       }
                       else{
                            echo $this->msg['error'];
                       }
                }

         }

    }

    public function __constructor($post){
        parent::__construct($post);
    }
    private function phpmailer(){
        include_once 'phpmailer' . DS . 'class.phpmailer.php';
        return new PHPMailer();
    }

    public function body(){
        $body = "<h3 style=\"color:#0066CC;border-bottom:1px solid #0066CC;\">Детали</h3>\n";
        foreach($this->data as $key => $val){
          if($this->fields[$key]['func'] != 'sec1'){
              if($this->fields[$key]['func'] != 'sec2'){
                    $field = $this->fields[$key]['name'];
                    $body .= "        <strong>{$field}: </strong>{$val}<br />";
              }
        }
    }
       return $body;

}

    public function subject(){
        $subject = "Derzava Test Message";
        return $subject;
    }

    public function from($a){
        if ($a == 'email') {
            return "noreply@drze.ru";
        } else {
            return "NoReply User";
        }
    }

    // Se enviar com sucesso entao grava uma sessao e checa, para o caso do cara nao ficar dando F5
}
?>