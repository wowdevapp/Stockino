export interface Category {
    id: number;
    category_name: string;
    category_slug: string;
    active:number;
    parent:{}| null
}