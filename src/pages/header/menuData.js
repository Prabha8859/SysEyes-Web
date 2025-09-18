const menuData = [
  { label: "Home", path: "/" },
  {
    label: "Features",
    subMenu: [
      { label: "Profiles", path: "/profile2" },
      { label: "Member Profile", path: "/profile" },
      { label: "Pricing Plan", path: "/pricing-plan" },
    ],
  },
  {
    label: "Blog",
    subMenu: [
      { label: "Blog", path: "/blog" },
      { label: "Blog Single", path: "/blog-single" },
    ],
  },
  { label: "Contact", path: "/contact" },
  { label: "About Us", path: "/about" },
];

export default menuData;
