import { SideMenu } from '../../interfaces/core/side-menu';


export const menuItemsSuperAdmin: SideMenu[] = [

  // Parent Dashboard
  {
    id: 'dashboard-parent',
    title: 'Dashboard',
    icon: 'dashboard',
    hasSubMenu: false,
    parentId: null,
    routerLink: 'dashboard',
    href: null,
    target: null
  },
  // Parent Customization
  {
    id: '2',
    title: 'Customization',
    icon: 'dashboard_customize',
    hasSubMenu: true,
    parentId: null,
    routerLink: null,
    href: null,
    target: null
  },
  {
    id: 'a2',
    title: 'Banner',
    icon: 'ad_units',
    hasSubMenu: false,
    parentId: '2',
    routerLink: 'customization/all-banner',
    href: null,
    target: null
  },
  {
    id: 'a4',
    title: 'Carousel',
    icon: 'view_carousel',
    hasSubMenu: false,
    parentId: '2',
    routerLink: 'customization/all-carousel',
    href: null,
    target: null
  },
  {
    id: 'a3',
    title: 'Institution information',
    icon: 'info',
    hasSubMenu: false,
    parentId: '2',
    routerLink: 'customization/shop-information',
    href: null,
    target: null
  },
  {
    id: 'a4',
    title: 'Popup',
    icon: 'ad_units',
    hasSubMenu: false,
    parentId: '2',
    routerLink: 'customization/all-popup',
    href: null,
    target: null
  },
  {
    id: 'a5',
    title: 'Faq',
    icon: 'ad_units',
    hasSubMenu: false,
    parentId: '2',
    routerLink: 'customization/all-faq',
    href: null,
    target: null
  },
  {
    id: 'a6',
    title: 'Link Shortener',
    icon: 'link',
    hasSubMenu: false,
    parentId: '2',
    routerLink: 'customization/all-link-shortener',
    href: null,
    target: null
  },
  // Parent Products
  {
    id: 'catalog-parent',
    title: 'Catalog',
    icon: 'category',
    hasSubMenu: true,
    parentId: null,
    routerLink: null,
    href: null,
    target: null
  },
  {
    id: 'catalog-2',
    title: 'Category',
    icon: 'stop',
    hasSubMenu: false,
    parentId: 'catalog-parent',
    routerLink: 'catalog/all-category',
    href: null,
    target: null
  },

  {
    id: 'catalog-4',
    title: 'Sub Category',
    icon: 'stop',
    hasSubMenu: false,
    parentId: 'catalog-parent',
    routerLink: 'catalog/all-subCategories',
    href: null,
    target: null
  },

  {
    id: 'catalog-8',
    title: 'Child Category',
    icon: 'stop',
    hasSubMenu: false,
    parentId: 'catalog-parent',
    routerLink: 'catalog/all-child-category',
    href: null,
    target: null
  },

  {
    id: 'catalog-5',
    title: 'All Unit',
    icon: 'stop',
    hasSubMenu: false,
    parentId: 'catalog-parent',
    routerLink: 'catalog/all-unit',
    href: null,
    target: null
  },
  {
    id: 'catalog-6',
    title: 'All Instructor',
    icon: 'stop',
    hasSubMenu: false,
    parentId: 'catalog-parent',
    routerLink: 'catalog/all-instructor',
    href: null,
    target: null
  },
  {
    id: 'catalog-3',
    title: 'Tag',
    icon: 'stop',
    hasSubMenu: false,
    parentId: 'catalog-parent',
    routerLink: 'catalog/all-tags',
    href: null,
    target: null
  },
  // Parent
  {
    id: 'course-parent',
    title: 'Course',
    icon: 'play_arrow',
    hasSubMenu: true,
    parentId: null,
    routerLink: null,
    href: null,
    target: null
  },
  {
    id: 'course-1',
    title: 'All Course',
    icon: 'stop',
    hasSubMenu: false,
    parentId: 'course-parent',
    routerLink: 'course/all-course',
    href: null,
    target: null
  },
  {
    id: 'course-2',
    title: 'Add Course',
    icon: 'stop',
    hasSubMenu: false,
    parentId: 'course-parent',
    routerLink: 'course/add-course',
    href: null,
    target: null
  },

  // Parent
  {
    id: 'order-parent',
    title: 'Order',
    icon: 'subscriptions',
    hasSubMenu: true,
    parentId: null,
    routerLink: null,
    href: null,
    target: null
  },
  {
    id: 'order-1',
    title: 'All Order',
    icon: 'stop',
    hasSubMenu: false,
    parentId: 'order-parent',
    routerLink: 'order/all-order',
    href: null,
    target: null
  },
  // {
  //   id: 'order-2',
  //   title: 'Add Review',
  //   icon: 'stop',
  //   hasSubMenu: false,
  //   parentId: 'review-parent',
  //   routerLink: 'review/add-review',
  //   href: null,
  //   target: null
  // },


  // Parent
  {
    id: 'product-parent',
    title: 'product',
    icon: 'play_arrow',
    hasSubMenu: true,
    parentId: null,
    routerLink: null,
    href: null,
    target: null
  },
  {
    id: 'product-3',
    title: 'All Category',
    icon: 'stop',
    hasSubMenu: false,
    parentId: 'product-parent',
    routerLink: 'catalog/all-product-category',
    href: null,
    target: null
  },
  {
    id: 'product-3',
    title: 'All Product Type',
    icon: 'stop',
    hasSubMenu: false,
    parentId: 'product-parent',
    routerLink: 'product-type/all-product-type',
    href: null,
    target: null
  },
  {
    id: 'product-1',
    title: 'All product',
    icon: 'stop',
    hasSubMenu: false,
    parentId: 'product-parent',
    routerLink: 'product/all-product',
    href: null,
    target: null
  },
  {
    id: 'product-2',
    title: 'Add product',
    icon: 'stop',
    hasSubMenu: false,
    parentId: 'product-parent',
    routerLink: 'product/add-product',
    href: null,
    target: null
  },



  // Parent
  {
    id: 'sales-parent',
    title: 'Sales',
    icon: 'play_arrow',
    hasSubMenu: true,
    parentId: null,
    routerLink: null,
    href: null,
    target: null
  },
  {
    id: 'sales-3',
    title: 'Orders List',
    icon: 'stop',
    hasSubMenu: false,
    parentId: 'sales-parent',
    routerLink: 'sales/all-orders',
    href: null,
    target: null
  },
  {
    id: 'sales-1',
    title: 'Transaction',
    icon: 'stop',
    hasSubMenu: false,
    parentId: 'sales-parent',
    routerLink: 'sales/transaction',
    href: null,
    target: null
  },
  {
    id: 'sales-2',
    title: 'Shipping Charge',
    icon: 'stop',
    hasSubMenu: false,
    parentId: 'sales-parent',
    routerLink: 'sales/shipping-charge',
    href: null,
    target: null
  },


  // Parent
  {
    id: 'quiz-parent',
    title: 'Quiz',
    icon: 'quiz',
    hasSubMenu: true,
    parentId: null,
    routerLink: null,
    href: null,
    target: null
  },
  {
    id: 'quiz-1',
    title: 'All Quiz Result',
    icon: 'stop',
    hasSubMenu: false,
    parentId: 'quiz-parent',
    routerLink: 'quiz/all-quiz-result',
    href: null,
    target: null
  },
  {
    id: 'quiz-1',
    title: 'Manual Quiz Result',
    icon: 'stop',
    hasSubMenu: false,
    parentId: 'quiz-parent',
    routerLink: 'quiz/manual-quiz-result',
    href: null,
    target: null
  },
  {
    id: 'quiz-2',
    title: 'All Quiz',
    icon: 'stop',
    hasSubMenu: false,
    parentId: 'quiz-parent',
    routerLink: 'quiz/all-quiz',
    href: null,
    target: null
  },
  {
    id: 'quiz-3',
    title: 'Add Quiz',
    icon: 'stop',
    hasSubMenu: false,
    parentId: 'quiz-parent',
    routerLink: 'quiz/add-quiz',
    href: null,
    target: null
  },

  // Parent
  {
    id: 'review-parent',
    title: 'Review',
    icon: 'rate_review',
    hasSubMenu: true,
    parentId: null,
    routerLink: null,
    href: null,
    target: null
  },
  {
    id: 'review-1',
    title: 'All Review',
    icon: 'stop',
    hasSubMenu: false,
    parentId: 'review-parent',
    routerLink: 'review/all-review',
    href: null,
    target: null
  },
  {
    id: 'review-2',
    title: 'Add Review',
    icon: 'stop',
    hasSubMenu: false,
    parentId: 'review-parent',
    routerLink: 'review/add-review',
    href: null,
    target: null
  },

// Parent
  {
    id: 'product-review-parent',
    title: 'Product Review',
    icon: 'rate_review',
    hasSubMenu: true,
    parentId: null,
    routerLink: null,
    href: null,
    target: null
  },
  {
    id: 'product-review-1',
    title: 'All Review',
    icon: 'stop',
    hasSubMenu: false,
    parentId: 'product-review-parent',
    routerLink: 'product-review',
    href: null,
    target: null
  },




  // Parent
  {
    id: 'offline-parent',
    title: 'Offline Course',
    icon: 'task',
    hasSubMenu: true,
    parentId: null,
    routerLink: null,
    href: null,
    target: null
  },
  {
    id: 'offline-1',
    title: 'All Course',
    icon: 'stop',
    hasSubMenu: false,
    parentId: 'offline-parent',
    routerLink: 'offline/all-offline-course',
    href: null,
    target: null
  },
  {
    id: 'offline-2',
    title: 'Add Course',
    icon: 'stop',
    hasSubMenu: false,
    parentId: 'offline-parent',
    routerLink: 'offline/add-offline-course',
    href: null,
    target: null
  },

  // Parent
  {
    id: 'offer',
    title: 'Offer',
    icon: 'rate_review',
    hasSubMenu: true,
    parentId: null,
    routerLink: null,
    href: null,
    target: null
  },
  {
    id: 'coupon-list',
    title: 'Coupon List',
    icon: 'stop',
    hasSubMenu: false,
    parentId: 'offer',
    routerLink: 'offer/all-coupon',
    href: null,
    target: null
  },


  // Parent
  {
    id: 'notice-parent',
    title: 'Notice',
    icon: 'task',
    hasSubMenu: true,
    parentId: null,
    routerLink: null,
    href: null,
    target: null
  },
  {
    id: 'notice-1',
    title: 'All Notice',
    icon: 'stop',
    hasSubMenu: false,
    parentId: 'notice-parent',
    routerLink: 'notice/all-notice',
    href: null,
    target: null
  },
  {
    id: 'notice-2',
    title: 'Add Notice',
    icon: 'stop',
    hasSubMenu: false,
    parentId: 'notice-parent',
    routerLink: 'notice/add-notice',
    href: null,
    target: null
  },

  // Parent
  {
    id: 'blog-parent',
    title: 'Blog',
    icon: 'task',
    hasSubMenu: true,
    parentId: null,
    routerLink: null,
    href: null,
    target: null
  },
  {
    id: 'blog-1',
    title: 'All Blog',
    icon: 'stop',
    hasSubMenu: false,
    parentId: 'blog-parent',
    routerLink: 'blog/all-blog',
    href: null,
    target: null
  },
  {
    id: 'blog-2',
    title: 'Add Blog',
    icon: 'stop',
    hasSubMenu: false,
    parentId: 'blog-parent',
    routerLink: 'blog/add-blog',
    href: null,
    target: null
  },

  // Parent
  {
    id: 'address-parent',
    title: 'Address',
    icon: 'task',
    hasSubMenu: true,
    parentId: null,
    routerLink: null,
    href: null,
    target: null
  },
  {
    id: 'address-1',
    title: 'All Division',
    icon: 'stop',
    hasSubMenu: false,
    parentId: 'address-parent',
    routerLink: 'address/all-divisions',
    href: null,
    target: null
  },
  {
    id: 'address-2',
    title: 'District',
    icon: 'stop',
    hasSubMenu: false,
    parentId: 'address-parent',
    routerLink: 'address/all-area',
    href: null,
    target: null
  },

  // {
  //   id: 'address-3',
  //   title: 'Zone',
  //   icon: 'stop',
  //   hasSubMenu: false,
  //   parentId: 'address-parent',
  //   routerLink: 'address/all-zone',
  //   href: null,
  //   target: null
  // },

  // Parent
  // {
  //   id: 'seo-parent',
  //   title: 'Seo',
  //   icon: 'manage_search',
  //   hasSubMenu: true,
  //   parentId: null,
  //   routerLink: null,
  //   href: null,
  //   target: null
  // },
  // {
  //   id: 'Seo-1',
  //   title: 'All Seo',
  //   icon: 'stop',
  //   hasSubMenu: false,
  //   parentId: 'seo-parent',
  //   routerLink: 'seo/all-seo',
  //   href: null,
  //   target: null
  // },
  // {
  //   id: 'seo-2',
  //   title: 'Add Seo',
  //   icon: 'stop',
  //   hasSubMenu: false,
  //   parentId: 'seo-parent',
  //   routerLink: 'seo/add-seo',
  //   href: null,
  //   target: null
  // },
  // Parent
  {
    id: 'user-parent',
    title: 'User',
    icon: 'people',
    hasSubMenu: true,
    parentId: null,
    routerLink: null,
    href: null,
    target: null
  },
  {
    id: 'user-1',
    title: 'Users',
    icon: 'stop',
    hasSubMenu: false,
    parentId: 'user-parent',
    routerLink: 'user/all-user',
    href: null,
    target: null
  },
  {
    id: 'user-2',
    title: 'Add User',
    icon: 'stop',
    hasSubMenu: false,
    parentId: 'user-parent',
    routerLink: 'user/add-user',
    href: null,
    target: null
  },
  // Parent
  {
    id: 'gallery-parent',
    title: 'Gallery',
    icon: 'collections',
    hasSubMenu: true,
    parentId: null,
    routerLink: null,
    href: null,
    target: null
  },
  {
    id: 'gallery-1',
    title: 'Folders',
    icon: 'folder',
    hasSubMenu: false,
    parentId: 'gallery-parent',
    routerLink: 'gallery/all-folders',
    href: null,
    target: null
  },
  {
    id: 'gallery-2',
    title: 'Images',
    icon: 'perm_media',
    hasSubMenu: false,
    parentId: 'gallery-parent',
    routerLink: 'gallery/all-images',
    href: null,
    target: null
  },
  // {
  //   id: 'gallery-3',
  //   title: 'Videos',
  //   icon: 'perm_media',
  //   hasSubMenu: false,
  //   parentId: 'gallery-parent',
  //   routerLink: 'gallery/all-videos',
  //   href: null,
  //   target: null
  // },

  {
    id: 'gallery-4',
    title: 'Files',
    icon: 'perm_media',
    hasSubMenu: false,
    parentId: 'gallery-parent',
    routerLink: 'gallery/all-file',
    href: null,
    target: null
  },


  // Parent Contact us
  // {
  //   id: 'Contact-parent',
  //   title: 'Contact Us',
  //   icon: 'dashboard',
  //   hasSubMenu: false,
  //   parentId: null,
  //   routerLink: 'contact-us',
  //   href: null,
  //   target: null
  // },

  {
    id: 'admin-parent',
    title: 'Admin Control',
    icon: 'offline_bolt',
    hasSubMenu: true,
    parentId: null,
    routerLink: null,
    href: null,
    target: null
  },
  // {
  //   id: '51',
  //   title: 'Roles',
  //   icon: 'offline_bolt',
  //   hasSubMenu: false,
  //   parentId: '631',
  //   routerLink: 'roles',
  //   href: null,
  //   target: null
  // },
  // Parent Users
  {
    id: 'admin-1',
    title: 'All Admins',
    icon: 'group_add',
    hasSubMenu: false,
    parentId: 'admin-parent',
    routerLink: 'admin-control/all-admins',
    href: null,
    target: null
  },

  {
    id: 'additional-page-parent',
    title: 'Additional Pages',
    icon: 'pages',
    hasSubMenu: true,
    parentId: null,
    routerLink: null,
    href: null,
    target: null
  },
  {
    id: 'additional-page-child-1',
    title: 'Page List',
    icon: 'group_add',
    hasSubMenu: false,
    parentId: 'additional-page-parent',
    routerLink: 'additional-pages/page-list',
    href: null,
    target: null
  },

  // Parent Support
  {
    id: '10',
    title: 'Support',
    icon: 'support_agent',
    hasSubMenu: false,
    parentId: null,
    routerLink: null,
    href: 'https://test.com/',
    target: '_blank'
  },

];



export const menuItemsEditorAdmin: SideMenu[] = [

  // Parent Dashboard
  {
    id: 'dashboard-parent',
    title: 'Dashboard',
    icon: 'dashboard',
    hasSubMenu: false,
    parentId: null,
    routerLink: 'dashboard',
    href: null,
    target: null
  },
  // Parent Customization
  // {
  //   id: '2',
  //   title: 'Customization',
  //   icon: 'dashboard_customize',
  //   hasSubMenu: true,
  //   parentId: null,
  //   routerLink: null,
  //   href: null,
  //   target: null
  // },
  // {
  //   id: 'a2',
  //   title: 'Banner',
  //   icon: 'ad_units',
  //   hasSubMenu: false,
  //   parentId: '2',
  //   routerLink: 'customization/all-banner',
  //   href: null,
  //   target: null
  // },
  // {
  //   id: 'a4',
  //   title: 'Carousel',
  //   icon: 'view_carousel',
  //   hasSubMenu: false,
  //   parentId: '2',
  //   routerLink: 'customization/all-carousel',
  //   href: null,
  //   target: null
  // },
  // {
  //   id: 'a3',
  //   title: 'Institution information',
  //   icon: 'info',
  //   hasSubMenu: false,
  //   parentId: '2',
  //   routerLink: 'customization/shop-information',
  //   href: null,
  //   target: null
  // },
  // {
  //   id: 'a4',
  //   title: 'Popup',
  //   icon: 'ad_units',
  //   hasSubMenu: false,
  //   parentId: '2',
  //   routerLink: 'customization/all-popup',
  //   href: null,
  //   target: null
  // },
  // Parent Products
  {
    id: 'catalog-parent',
    title: 'Catalog',
    icon: 'category',
    hasSubMenu: true,
    parentId: null,
    routerLink: null,
    href: null,
    target: null
  },
  {
    id: 'catalog-2',
    title: 'Category',
    icon: 'stop',
    hasSubMenu: false,
    parentId: 'catalog-parent',
    routerLink: 'catalog/all-category',
    href: null,
    target: null
  },

  {
    id: 'catalog-4',
    title: 'Sub Category',
    icon: 'stop',
    hasSubMenu: false,
    parentId: 'catalog-parent',
    routerLink: 'catalog/all-subCategories',
    href: null,
    target: null
  },

  {
    id: 'catalog-8',
    title: 'Child Category',
    icon: 'stop',
    hasSubMenu: false,
    parentId: 'catalog-parent',
    routerLink: 'catalog/all-child-category',
    href: null,
    target: null
  },

  {
    id: 'catalog-5',
    title: 'All Unit',
    icon: 'stop',
    hasSubMenu: false,
    parentId: 'catalog-parent',
    routerLink: 'catalog/all-unit',
    href: null,
    target: null
  },
  {
    id: 'catalog-6',
    title: 'All Instructor',
    icon: 'stop',
    hasSubMenu: false,
    parentId: 'catalog-parent',
    routerLink: 'catalog/all-instructor',
    href: null,
    target: null
  },
  {
    id: 'catalog-3',
    title: 'Tag',
    icon: 'stop',
    hasSubMenu: false,
    parentId: 'catalog-parent',
    routerLink: 'catalog/all-tags',
    href: null,
    target: null
  },
  // Parent
  {
    id: 'course-parent',
    title: 'Course',
    icon: 'play_arrow',
    hasSubMenu: true,
    parentId: null,
    routerLink: null,
    href: null,
    target: null
  },
  {
    id: 'course-1',
    title: 'All Course',
    icon: 'stop',
    hasSubMenu: false,
    parentId: 'course-parent',
    routerLink: 'course/all-course',
    href: null,
    target: null
  },
  {
    id: 'course-2',
    title: 'Add Course',
    icon: 'stop',
    hasSubMenu: false,
    parentId: 'course-parent',
    routerLink: 'course/add-course',
    href: null,
    target: null
  },

  // Parent
  {
    id: 'quiz-parent',
    title: 'Quiz',
    icon: 'quiz',
    hasSubMenu: true,
    parentId: null,
    routerLink: null,
    href: null,
    target: null
  },
  {
    id: 'quiz-1',
    title: 'All Quiz',
    icon: 'stop',
    hasSubMenu: false,
    parentId: 'quiz-parent',
    routerLink: 'quiz/all-quiz',
    href: null,
    target: null
  },
  {
    id: 'quiz-2',
    title: 'Add Quiz',
    icon: 'stop',
    hasSubMenu: false,
    parentId: 'quiz-parent',
    routerLink: 'quiz/add-quiz',
    href: null,
    target: null
  },

  // // Parent
  // {
  //   id: 'review-parent',
  //   title: 'Review',
  //   icon: 'rate_review',
  //   hasSubMenu: true,
  //   parentId: null,
  //   routerLink: null,
  //   href: null,
  //   target: null
  // },
  // {
  //   id: 'review-1',
  //   title: 'All Review',
  //   icon: 'stop',
  //   hasSubMenu: false,
  //   parentId: 'review-parent',
  //   routerLink: 'review/all-review',
  //   href: null,
  //   target: null
  // },
  // {
  //   id: 'review-2',
  //   title: 'Add Review',
  //   icon: 'stop',
  //   hasSubMenu: false,
  //   parentId: 'review-parent',
  //   routerLink: 'review/add-review',
  //   href: null,
  //   target: null
  // },

  //
  // // Parent
  // {
  //   id: 'order-parent',
  //   title: 'Order',
  //   icon: 'subscriptions',
  //   hasSubMenu: true,
  //   parentId: null,
  //   routerLink: null,
  //   href: null,
  //   target: null
  // },
  // {
  //   id: 'order-1',
  //   title: 'All Order',
  //   icon: 'stop',
  //   hasSubMenu: false,
  //   parentId: 'order-parent',
  //   routerLink: 'order/all-order',
  //   href: null,
  //   target: null
  // },
  // // {
  // //   id: 'order-2',
  // //   title: 'Add Review',
  // //   icon: 'stop',
  // //   hasSubMenu: false,
  // //   parentId: 'review-parent',
  // //   routerLink: 'review/add-review',
  // //   href: null,
  // //   target: null
  // // },
  //
  //
  // // Parent
  // {
  //   id: 'offline-parent',
  //   title: 'Offline Course',
  //   icon: 'task',
  //   hasSubMenu: true,
  //   parentId: null,
  //   routerLink: null,
  //   href: null,
  //   target: null
  // },
  // {
  //   id: 'offline-1',
  //   title: 'All Course',
  //   icon: 'stop',
  //   hasSubMenu: false,
  //   parentId: 'offline-parent',
  //   routerLink: 'offline/all-offline-course',
  //   href: null,
  //   target: null
  // },
  // {
  //   id: 'offline-2',
  //   title: 'Add Course',
  //   icon: 'stop',
  //   hasSubMenu: false,
  //   parentId: 'offline-parent',
  //   routerLink: 'offline/add-offline-course',
  //   href: null,
  //   target: null
  // },
  //
  //
  // // Parent
  // {
  //   id: 'notice-parent',
  //   title: 'Notice',
  //   icon: 'task',
  //   hasSubMenu: true,
  //   parentId: null,
  //   routerLink: null,
  //   href: null,
  //   target: null
  // },
  // {
  //   id: 'notice-1',
  //   title: 'All Notice',
  //   icon: 'stop',
  //   hasSubMenu: false,
  //   parentId: 'notice-parent',
  //   routerLink: 'notice/all-notice',
  //   href: null,
  //   target: null
  // },
  // {
  //   id: 'notice-2',
  //   title: 'Add Notice',
  //   icon: 'stop',
  //   hasSubMenu: false,
  //   parentId: 'notice-parent',
  //   routerLink: 'notice/add-notice',
  //   href: null,
  //   target: null
  // },
  //
  // Parent
  {
    id: 'blog-parent',
    title: 'Blog',
    icon: 'task',
    hasSubMenu: true,
    parentId: null,
    routerLink: null,
    href: null,
    target: null
  },
  {
    id: 'blog-1',
    title: 'All Blog',
    icon: 'stop',
    hasSubMenu: false,
    parentId: 'blog-parent',
    routerLink: 'blog/all-blog',
    href: null,
    target: null
  },
  {
    id: 'blog-2',
    title: 'Add Blog',
    icon: 'stop',
    hasSubMenu: false,
    parentId: 'blog-parent',
    routerLink: 'blog/add-blog',
    href: null,
    target: null
  },





  // Parent
  // {
  //   id: 'seo-parent',
  //   title: 'Seo',
  //   icon: 'manage_search',
  //   hasSubMenu: true,
  //   parentId: null,
  //   routerLink: null,
  //   href: null,
  //   target: null
  // },
  // {
  //   id: 'Seo-1',
  //   title: 'All Seo',
  //   icon: 'stop',
  //   hasSubMenu: false,
  //   parentId: 'seo-parent',
  //   routerLink: 'seo/all-seo',
  //   href: null,
  //   target: null
  // },
  // {
  //   id: 'seo-2',
  //   title: 'Add Seo',
  //   icon: 'stop',
  //   hasSubMenu: false,
  //   parentId: 'seo-parent',
  //   routerLink: 'seo/add-seo',
  //   href: null,
  //   target: null
  // },
  // Parent
  // {
  //   id: 'user-parent',
  //   title: 'User',
  //   icon: 'people',
  //   hasSubMenu: true,
  //   parentId: null,
  //   routerLink: null,
  //   href: null,
  //   target: null
  // },
  // {
  //   id: 'user-1',
  //   title: 'Users',
  //   icon: 'stop',
  //   hasSubMenu: false,
  //   parentId: 'user-parent',
  //   routerLink: 'user/all-user',
  //   href: null,
  //   target: null
  // },
  // {
  //   id: 'user-2',
  //   title: 'Add User',
  //   icon: 'stop',
  //   hasSubMenu: false,
  //   parentId: 'user-parent',
  //   routerLink: 'user/add-user',
  //   href: null,
  //   target: null
  // },
  // // Parent
  // {
  //   id: 'gallery-parent',
  //   title: 'Gallery',
  //   icon: 'collections',
  //   hasSubMenu: true,
  //   parentId: null,
  //   routerLink: null,
  //   href: null,
  //   target: null
  // },
  // {
  //   id: 'gallery-1',
  //   title: 'Folders',
  //   icon: 'folder',
  //   hasSubMenu: false,
  //   parentId: 'gallery-parent',
  //   routerLink: 'gallery/all-folders',
  //   href: null,
  //   target: null
  // },
  // {
  //   id: 'gallery-2',
  //   title: 'Images',
  //   icon: 'perm_media',
  //   hasSubMenu: false,
  //   parentId: 'gallery-parent',
  //   routerLink: 'gallery/all-images',
  //   href: null,
  //   target: null
  // },
  // {
  //   id: 'gallery-3',
  //   title: 'Videos',
  //   icon: 'perm_media',
  //   hasSubMenu: false,
  //   parentId: 'gallery-parent',
  //   routerLink: 'gallery/all-videos',
  //   href: null,
  //   target: null
  // },

  // {
  //   id: 'gallery-4',
  //   title: 'Files',
  //   icon: 'perm_media',
  //   hasSubMenu: false,
  //   parentId: 'gallery-parent',
  //   routerLink: 'gallery/all-file',
  //   href: null,
  //   target: null
  // },


  // Parent Contact us
  // {
  //   id: 'Contact-parent',
  //   title: 'Contact Us',
  //   icon: 'dashboard',
  //   hasSubMenu: false,
  //   parentId: null,
  //   routerLink: 'contact-us',
  //   href: null,
  //   target: null
  // },
  //
  // {
  //   id: 'admin-parent',
  //   title: 'Admin Control',
  //   icon: 'offline_bolt',
  //   hasSubMenu: true,
  //   parentId: null,
  //   routerLink: null,
  //   href: null,
  //   target: null
  // },
  // {
  //   id: '51',
  //   title: 'Roles',
  //   icon: 'offline_bolt',
  //   hasSubMenu: false,
  //   parentId: '631',
  //   routerLink: 'roles',
  //   href: null,
  //   target: null
  // },
  // Parent Users
  // {
  //   id: 'admin-1',
  //   title: 'All Admins',
  //   icon: 'group_add',
  //   hasSubMenu: false,
  //   parentId: 'admin-parent',
  //   routerLink: 'admin-control/all-admins',
  //   href: null,
  //   target: null
  // },
  //
  // {
  //   id: 'additional-page-parent',
  //   title: 'Additional Pages',
  //   icon: 'pages',
  //   hasSubMenu: true,
  //   parentId: null,
  //   routerLink: null,
  //   href: null,
  //   target: null
  // },
  // {
  //   id: 'additional-page-child-1',
  //   title: 'Page List',
  //   icon: 'group_add',
  //   hasSubMenu: false,
  //   parentId: 'additional-page-parent',
  //   routerLink: 'additional-pages/page-list',
  //   href: null,
  //   target: null
  // },

  // Parent Support
  {
    id: '10',
    title: 'Support',
    icon: 'support_agent',
    hasSubMenu: false,
    parentId: null,
    routerLink: null,
    href: 'https://test.com/',
    target: '_blank'
  },

];
