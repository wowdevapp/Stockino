<?php
return [
    'app' => [
    'title' => 'General',
    'desc' => 'All the general settings for application.',
    'icon' => 'glyphicon glyphicon-sunglasses',

        'elements' => [
        [
        'type' => 'text', // input fields type
        'data' => 'string', // data type, string, int, boolean
        'name' => 'system_name', // unique name for field
        'label' => 'App Name', // you know what label it is
        'rules' => 'required|min:2|max:50', // validation rule of laravel
        'value' => '' // default value if you want
        ],
        [
            'type' => 'radio', // input fields type
            'data' => 'boolean', // data type, string, int, boolean
            'name' => 'active', // unique name for field
            'label' => 'status', // you know what label it is
            'rules' => 'required|boolean', // validation rule of laravel
            'value' => '' // default value if you want
        ],

      ]
     ],
];
