<?php

namespace App\Http\Controllers\Product;

use App\Http\Requests\product\CategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Product\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return AnonymousResourceCollection
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        $perPage = $request->input('pageSize', 10);
        $categories=Category::with('parent')->paginate($perPage);
        return CategoryResource::collection($categories);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param CategoryRequest $request
     * @return CategoryResource
     */
    public function store(CategoryRequest $request): CategoryResource
    {
        $category =Category::create($request->getFilteredAttributes())->load('parent');
        return new CategoryResource($category);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Category  $category
     * @return Response
     */
    public function show(Category $category)
    {
        $category->load('parent');
        return new CategoryResource($category);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Category  $category
     * @return Response
     */
    public function edit(Category $category)
    {
        dd($category);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param  \App\Models\Category  $category
     * @return Response
     */
    public function update(Request $request, Category $category)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Category  $category
     * @return Response
     */
    public function destroy(Category $category)
    {
        //
    }
}
