<?php
/**
 * Created by PhpStorm.
 * User: erict
 * Date: 15/08/2019
 * Time: 11:45
 */

use PHPMailer\PHPMailer\PHPMailer;

date_default_timezone_set('America/Sao_Paulo');
setlocale (LC_ALL, 'pt_BR');

require_once("./class/PHPMailer.php");
require_once("./class/Exception.php");
require_once("./class/SMTP.php");
include("./functions.php");

?>




<?php
/* salva pedido em txt */



$datahora = date("d/m/Y")." - ".date("H:i");
$datahoraarquivo = date("Y-m-d")."_".date("H-i");
$nomedoarquivo = "./pedidos/".$datahoraarquivo.".txt";

$mensagem = "<p>PEDIDO</p>".$datahora;
$msg_arq = "PEDIDO - ".$datahora." \n ================ \n\n";


$mensagem.="";


$mail=new PHPMailer();
$mail->IsSMTP();
$mail->Port = 587;
$mail->SMTPAuth = true;
//sendgrid
$mail->Username="apikey";
$mail->Password = "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";   //api key from sendgrid
$mail->Host="smtp.sendgrid.net";
$mail->SMTPSecure = 'tls';
$mail->From = "pedidos@nutricaovitalizante.com.br";
$mail->FromName = 'Nutri��o Vitalizante';
$mail->AddAddress("tiagoorm@gmail.com");  // Add a recipient
$mail->MsgHTML($mensagem);
$mail->isHTML(true);
$mail->Body    = $mensagem;
$mail->Subject = 'Pedido - '.$nomefantasia;
$mail->isHTML(true);

if(!$mail->Send()):
    ?>
    
    erro ao enviar 

<?php
else:
?>
   

Enviado com sucesso.

<?php
endif;
$mail->ClearAddresses();
$mail->ClearAttachments();

?>

            </div>
            <div class="column is-1-mobile is-1-tablet is-2-desktop">

            </div>
        </div>
    </div>


    </body>
</html>
