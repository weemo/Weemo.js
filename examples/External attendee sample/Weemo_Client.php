<?php
/**
 * Class Weemo_Client
 */
class Weemo_Client {
    /** @var  string $_client_id */
    private $_client_id;
    /** @var  string $_client_secret */
    private $_client_secret;
    /** @var  string $_p12 */
    private $_p12;
    /** @var  string $_passphrase */
    private $_passphrase;

    /** @var  string */
    private $_file_pem;
    /** @var  string */
    private $_file_key;
    /** @var  array $_certs */
    private $_certs;
    /** @var  array $_scope */
    private $_scope;
    /** @var  resource $_curl */
    private $_curl;

    /*
     * This function init parameters and call initCertificate, initCertificate check format of P12
     * and verify informations.
     * If informations in not valid new exception is raised with message.
     */
    public function __construct($client_id, $client_secret, $p12, $passphrase = 'XnyexbUF', $scope = 'https://oauths.weemo.com/auth/')
    {
        /** set vars */
        $this->_client_id       = $client_id;
        $this->_client_secret   = $client_secret;
        $this->_p12             = $p12;
        $this->_passphrase      = $passphrase;
        $this->_scope           = $scope;
        /** Launch check P12 file */
        $this->initCertificate();
    }

    /*
     * This function create file  pem extract from P12,
     * if file already exists file doesn't created, you must delete file to regenerate PEM
     */
    public function createCertFile()
    {
        /** @var string $name */
        $name = str_replace('p12', 'pem', $this->_p12);

        if(!file_exists($name)) {
            if(!$fd = fopen($name, 'a+'))
                throw new Exception('Impossible to create PEM file : check permissions');
            file_put_contents($name, $this->_certs['cert']);
            fclose($fd);
            
        }
        $this->_file_pem = $name;

        /** return */
        return ($this);
    }

    /*
     * This function create file key extract from P12,
     * if file already exists file doesn't created, you must delete file to regenerate KEY
     */
    public function createKeyFile()
    {
        /** @var string $name */
        $name = str_replace('p12', 'key', $this->_p12);

        if(!file_exists($name)) {
            if(!$fd = fopen($name, 'a+'))
                throw new Exception('Impossible to create KEY file : check permissions');
            file_put_contents($name, $this->_certs['pkey']);
            fclose($fd);
            
        }
        $this->_file_key = $name;

        /** return */
        return ($this);
    }

    protected function initCertificate() {
        if(!file_exists($this->_p12))
            throw new Exception('This P12 not found on this server !');
        if(!openssl_pkcs12_read(file_get_contents($this->_p12), $this->_certs, $this->_passphrase)) {
            throw new Exception("Unable to parse the p12 file.  " .
            "Is this a .p12 file?  Is the password correct?  OpenSSL error: " .
            openssl_error_string());
        }
    }

    /*
     * This function init curl and it's possible to set specials parameters for curl,
     * in the new version and the secret_client client_id be passed in the HTTP head don't panic :)
     */
    public function initWCurl(array $params = null)
    {
        /** @var string _curl */
        $this->_curl = curl_init($this->_scope.'?client_id='.$this->_client_id.'&client_secret='.$this->_client_secret);
        if(null !== $params)
            curl_setopt_array($this->_curl, $params);

        return ($this);
    }

    /*
     * This function sent HTTP request with curl and connection SSL, she return a token,
     * you must verify validity of P12 because is valid for 1 year...
     * Specify uid is mandatory , if domain is null domain by default use is same for profile.
     * SSL version 3
     *
     * If you have curl and NSS installed on your server, it's possible to this library doesn't work,
     * check this.
     */
    public function sent($uid, $domain = null, $profile = null)
    {
        /** POSTS PARAMETERS */
        $params['uid']       = $uid;
        $params['identifier_client'] = $domain;
        $params['id_profile']= $profile;

        /** OTHERS PARAMETERS */
        curl_setopt($this->_curl, CURLOPT_POST, true);
        curl_setopt($this->_curl, CURLOPT_POSTFIELDS, $params);

        /** SSL PARAMETERS */
        curl_setopt($this->_curl, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($this->_curl, CURLOPT_SSL_VERIFYPEER, true);
        curl_setopt($this->_curl, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($this->_curl, CURLOPT_CAPATH, '.');
        curl_setopt($this->_curl, CURLOPT_SSL_VERIFYHOST, true);
        curl_setopt($this->_curl, CURLOPT_FAILONERROR, 0);
        curl_setopt($this->_curl, CURLOPT_SSLVERSION, 3);
        curl_setopt($this->_curl, CURLOPT_SSLKEYPASSWD, $this->_passphrase);
        curl_setopt($this->_curl, CURLOPT_SSLCERT, getcwd().'/'.$this->_file_pem);
        curl_setopt($this->_curl, CURLOPT_SSLCERTPASSWD, $this->_passphrase);
        curl_setopt($this->_curl, CURLOPT_SSLKEYTYPE, 'PEM');
        curl_setopt($this->_curl, CURLOPT_SSLKEY, $this->_file_key);
        curl_setopt($this->_curl, CURLOPT_CAINFO, getcwd().'/weemo-ca.pem');
        curl_setopt($this->_curl, CURLOPT_HTTPHEADER, array('Expect:'));


        $result = curl_exec($this->_curl);
        return $result;

        echo curl_error($this->_curl);
    }
}


