import React from "react";
import ProductHero from "../components/MainPageComponent/ProductHero";
import ProductCategory from "../components/MainPageComponent/ProductCategory";


const data = [
  {
    image: "https://images.unsplash.com/photo-1534854638093-bada1813ca19?auto=format&fit=crop&w=1400",
    title: "Beautiful Beach",
    description: "Enjoy the serene beauty of the beach.",
  },
  {
    image: "https://images.unsplash.com/photo-1564419431636-fe02f0eff7aa?q=80&w=2568&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&w=1400",
    title: "Sunset View",
    description: "Experience the breathtaking sunset.",
  },
  
  {
    image: "https://images.unsplash.com/photo-1567197427669-a0d3603a3586?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&w=1400",
    title: "Tropical Paradise",
    description: "Relax in the tropical paradise.",
  }
];

export default function Mainpage() {
  return (
    <>
      {data.map((item, index) => (
        <React.Fragment key={index}>
          <ProductHero image={item.image} title={item.title} description={item.description} />
          {index === 0 && <ProductCategory />}  
          {index === 1 && <ProductCategory />}  
        </React.Fragment>
      ))}
    </>
  );
}
