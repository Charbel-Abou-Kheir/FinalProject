<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ContactUs extends Mailable
{
    use Queueable, SerializesModels;

    public $data;

    /**
     * Create a new message instance.
     */
    public function __construct($formFields)
    {
        $this->data = $formFields;
    }

    /** 
     * Build the message
     * 
     * @return $this
    */
    public function build()
    {
        return $this
        ->from($this->data['email'])
        ->subject($this->data['subject'])
        ->markdown('EmailView');
    }
}
