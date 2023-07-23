const burgersData = [
  {
    image:
      "https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YnVyZ2Vyc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    title: "Cheddar & Bacon Burger",
    text: "Crispy beef patty, bun, tomato, Cheddar cheese, bacon, red onion, iceberg lettuce, mayonnaise, ketchup, cheese sauce",
    price: 8,
    gramms: 360,
    basePrice: 8,
  },
  {
    image:
      "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YnVyZ2Vyc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    title: "BBQ Burger with Bacon",
    text: "Brioche bun with sesame seeds, patty, Cheddar cheese, pickled onion, Romaine lettuce, bacon, BBQ sauce",
    price: 7,
    gramms: 390,
    basePrice: 7,
  },
  {
    image:
      "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGJ1cmdlcnN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    title: "Double Beef Burger",
    text: "Two beef patties, Cheddar cheese, romaine lettuce, pickled cucumbers, fresh tomato, bacon, red onion, burger sauce, mustard",
    price: 10,
    gramms: 420,
    basePrice: 10,
  },
  {
    image:
      "https://images.unsplash.com/photo-1624348754836-743503fe9445?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTl8fGNoZWVzZWJ1cmdlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    title: "Bavarian Burger",
    text: "Burger bun, beef patty, red onion, cheese, hunter sausage, BBQ sauce, cheese sauce, iceberg lettuce",
    price: 7,
    gramms: 220,
    basePrice: 7,
  },
  {
    image:
      "https://plus.unsplash.com/premium_photo-1684534125661-614f59f16f2e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YnVyZ2Vyc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    title: "Bacon Cheeseburger",
    text: "Burger bun, beef patty, bacon, tomato, pickled cucumber, cheese, cheese sauce, ketchup, greens",
    price: 8,
    gramms: 220,
    basePrice: 8,
  },
  {
    image:
      "https://images.unsplash.com/photo-1598182198871-d3f4ab4fd181?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2hlZXNlYnVyZ2VyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    title: "Indiana Burger",
    text: "Burger bun, chicken patty, bacon, egg, pickled cucumber, crispy onion, ketchup, cheese sauce, mustard, greens",
    price: 9,
    gramms: 320,
    basePrice: 9,
  },
  {
    image:
      "https://images.unsplash.com/photo-1618219878829-8afd92751bed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNoZWVzZWJ1cmdlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    title: "Veggie Burger",
    text: "Burger bun, vegetarian patty, red onion, cheese, fresh tomato, BBQ sauce, cheese sauce, iceberg lettuce",
    price: 8,
    gramms: 280,
    basePrice: 8,
  },
  {
    image:
      "https://images.unsplash.com/photo-1599082295807-6e4a92c0790d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODJ8fGNoZWVzZWJ1cmdlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    title: "Whiny Joe Burger",
    text: "Burger bun, beef patty, bacon, tomato, pickled cucumber, red onion, cheese, jalapeño pepper, ketchup, greens",
    price: 7,
    gramms: 380,
    basePrice: 7,
  },
  {
    image:
      "https://images.unsplash.com/photo-1576843776838-032ac46fbb93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fGNoZWVzZWJ1cmdlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    title: "Double Cheeseburger",
    text: "Burger bun, two beef patties, double Cheddar cheese, pickled cucumber, crispy onion, ketchup",
    price: 11,
    gramms: 400,
    basePrice: 11,
  },
  {
    image:
      "https://images.unsplash.com/photo-1553979459-d2229ba7433b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjJ8fGNoZWVzZWJ1cmdlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    title: "Fresh Burger",
    text: "Burger bun, beef patty, bacon, Cheddar cheese, egg, salami, BBQ sauce, cheese sauce, iceberg lettuce, fresh tomato",
    price: 9,
    gramms: 300,
    basePrice: 9,
  },
  {
    image:
      "https://images.unsplash.com/photo-1614798765254-97e15819dad0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njl8fGNoZWVzZWJ1cmdlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    title: "Zucchini Burger",
    text: "Burger bun, vegetarian chickpea patty, grilled zucchini, tomato, pickled cucumber, cheese, mustard sauce, ketchup, greens",
    price: 8,
    gramms: 320,
    basePrice: 8,
  },
  {
    image:
      "https://images.unsplash.com/photo-1552913902-366e726db79e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzJ8fGNoZWVzZWJ1cmdlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    title: "Double Cheddar Burger",
    text: "Burger bun, beef patty, bacon, red onion, pickled cucumber, tomato, ketchup, double Cheddar cheese, mustard, greens",
    price: 9,
    gramms: 360,
    basePrice: 9,
  },
];

module.exports = burgersData;
