@component('mail::message')
  Name: {{$data['name']}} <br>
  Email: {{$data['email']}} <br>
  Subject: {{$data['subject']}} <br>
  Message: {{$data['content']}}
@endcomponent


