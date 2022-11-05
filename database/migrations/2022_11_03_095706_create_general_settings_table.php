<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGeneralSettingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        /*`id` int(11) NOT NULL,
  `system_name` varchar(250) NOT NULL,
  `photo` varchar(225) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `general_alert` varchar(150) DEFAULT NULL,
  `address` varchar(250) NOT NULL,
  `phone` varchar(100) DEFAULT NULL,
  `customer_parent_account_number` bigint(20) NOT NULL COMMENT 'رقم الحساب الاب للعملاء',
  `suppliers_parent_account_number` bigint(20) NOT NULL COMMENT 'الحساب الاب للموردين',
  `added_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `com_code` int(11) NOT NULL*/
        Schema::create('general_settings', function (Blueprint $table) {
            $table->id();
            $table->string('system_name');
            $table->string('photo')->nullable();
            $table->boolean('active')->default(true);
            $table->string('general_alert');
            $table->string('address');
            $table->string('phone');
            $table->bigInteger('customer_parent_account_number');
            $table->bigInteger('suppliers_parent_account_number');
            $table->integer('added_by')->nullable();
            $table->integer('updated_by')->nullable();
            $table->integer('com_code');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('general_settings');
    }
}
