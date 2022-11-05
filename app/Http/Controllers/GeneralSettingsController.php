<?php

namespace App\Http\Controllers;

use App\Http\Requests\GeneralSettingsRequest;
use App\Models\GeneralSetting;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class GeneralSettingsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        //
    }



    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(GeneralSettingsRequest $request): JsonResponse
    {
        $settings= new GeneralSetting();
        $data=$settings->create($request->all());
        return response()->json([
            'data'=>$data,
            'message'=>'successfully added settings'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param GeneralSetting $generalSetting
     * @return Response
     */
    public function show(GeneralSetting $generalSetting)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param GeneralSetting $generalSetting
     * @return Response
     */
    public function edit(GeneralSetting $generalSetting)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param GeneralSetting $generalSetting
     * @return Response
     */
    public function update(Request $request, GeneralSetting $generalSetting)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param GeneralSetting $generalSetting
     * @return Response
     */
    public function destroy(GeneralSetting $generalSetting)
    {
        //
    }
}
