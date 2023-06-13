// ** Icon imports
import PackageVariantClosed from "mdi-material-ui/PackageVariantClosed";

// ** Type import
import { VerticalNavItemsType } from "src/@core/layouts/types";

const navigation = (): VerticalNavItemsType => {
    return [
        /* {
      title: 'Dashboards',
      icon: HomeOutline,
      badgeContent: 'new',
      badgeColor: 'error',
      children: [
        {
          title: 'CRM',
          path: '/dashboards/crm'
        },
        {
          title: 'Analytics',
          path: '/dashboards/analytics'
        },
        {
          title: 'eCommerce',
          path: '/dashboards/ecommerce'
        }
      ]
    },
    {
      title: 'User',
      icon: AccountOutline,
      children: [
        {
          title: 'List',
          path: '/apps/user/list'
        },
        {
          title: 'View',
          path: '/apps/user/view'
        }
      ]
    }, */
        /* {
      title: 'Settings',
      icon: ShieldOutline,
      children: [
        {
          title: 'General Settings',
          path: '/settings/general-settings'
        }
      ]
    }, */
        {
            title: "Product",
            icon: PackageVariantClosed,
            children: [
                {
                    title: "Products List",
                    path: "/product",
                },
                {
                    title: "Add Product",
                    path: "/product/add-product",
                },
                {
                    title: "Category",
                    children: [
                        {
                            title: "Category List",
                            path: "/product/category",
                        },
                        {
                            title: "Add category",
                            path: "/product/category/add",
                        },
                    ],
                },
            ],
        },
    ];
};

export default navigation;
