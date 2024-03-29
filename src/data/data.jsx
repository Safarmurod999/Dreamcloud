import { RiHome2Line } from "react-icons/ri";
import { IoPersonOutline } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";
import { RiProductHuntLine } from "react-icons/ri";
import { GoTools } from "react-icons/go";
import { CiLocationOn } from "react-icons/ci";
import { lazy } from "react";
const Orders = lazy(() => import('../pages/Admin/Orders/Orders'));
const Customers = lazy(() => import('../pages/Admin/Customers/Customers'));
const Categories = lazy(() => import('../pages/Admin/Categories/Categories'));
const Products = lazy(() => import('../pages/Admin/Products/Products'));
const Technologies = lazy(() => import('../pages/Admin/Technologies/Technologies'));
const Addresses = lazy(() => import('../pages/Admin/Addresses/Addresses'));
export const BASE_URL = 'https://dreamcloud-backend-e4327b791528.herokuapp.com/';
export const features = [
  {
    id: 1,
    image: "/features/features-1.png",
    is_active: 1,
    title: "Yetkazib berish",
    description: "Toshkent bo'ylab bepul o'lchov va etkazib berish",
  },
  {
    id: 2,
    image: "/features/features-2.png",
    is_active: 1,
    title: "Qo'llab-quvvatlash",
    description:
      "Bizning qo'llab-quvvatlash xizmati sizga har qanday savolda yordam beradi va menejerlarning",
  },
  {
    id: 3,
    image: "/features/features-3.png",
    is_active: 1,
    title: "Kafolat",
    description:
      "Biz matraslarimiz uchun 8 yilgacha kafolat beramiz. Agar matras kamida 25 mm qisqartirilsa.",
  },
];
export const adminRoutes = [
  {
    id: 0,
    path: "/admin",
    name: "Buyurtmalar",
    current: true,
    icon: <RiHome2Line />,
    element: <Orders />,
  },
  {
    id: 1,
    path: "/admin/customers",
    name: "Mijozlar",
    current: false,
    icon: <IoPersonOutline />,
    element: <Customers />,
  },
  {
    id: 2,
    path: "/admin/categories",
    name: "Kategoriyalar",
    current: false,
    icon: <BiCategory />,
    element: <Categories />,
  },
  {
    id: 3,
    path: "/admin/products",
    name: "Mahsulotlar",
    current: false,
    icon: <RiProductHuntLine />,
    element: <Products />,
  },
  {
    id: 4,
    path: "/admin/technologies",
    name: "Texnologiyalar",
    current: false,
    icon: <GoTools />,
    element: <Technologies />,
  },
  {
    id: 5,
    path: "/admin/addresses",
    name: "Manzil",
    current: false,
    icon: <CiLocationOn />,
    element: <Addresses />
  },
];
