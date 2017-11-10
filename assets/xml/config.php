<?php if(basename(__file__) == 'config.php') exit; ?>
<?xml version="1.0" encoding="utf-8"?>
<xml>
    <Addresses>
        <!-- put your email here -->
        <address>minaevandrej@gmail.com</address>
    </Addresses>
    <Config>
        <smtp>
        <!-- smtp gmail config -->
            <use>yes</use>
            <auth>no</auth>
            <secure>tls</secure>
            <host>aspmx.l.google.com</host>
            <username>test@test.com</username>
            <password>123456</password>
            <port>25</port>
        </smtp>
        <charset>iso-8859-1</charset>
    </Config>
</xml>
