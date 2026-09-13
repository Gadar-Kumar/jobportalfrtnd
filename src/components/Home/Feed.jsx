import React from "react";
import PostCard from "./PostCard";

const posts = [
  {
    id: 1,
    name: "Amit Sharma",
    role: "Frontend Developer",
    content: "Built a new React dashboard 🚀",
    image: "https://i.pinimg.com/1200x/bc/5f/2e/bc5f2e71b57de80e0a8b40b759cb5291.jpg",
  },
  {
    id: 2,
    name: "Priya Verma",
    role: "UI/UX Designer",
    content: "Designing modern UI is fun 🎨",
    image: "https://i.pinimg.com/1200x/92/f2/98/92f2984ebd391d7e8c17a1e3cd673e46.jpg",
  },
  {
    id: 3,
    name: "Rahul Singh",
    role: "Backend Engineer",
    content: "Working with Node.js APIs ⚡",
    image: "https://i.pinimg.com/1200x/8b/a0/a9/8ba0a93c0547d88975bb08babe288c98.jpg",
  },
  {
    id: 4,
    name: "Sneha Gupta",
    role: "Data Analyst",
    content: "Data visualization project completed 📊",
    image: "https://i.pinimg.com/736x/06/b0/68/06b068a4cbd49efb60c922b044c9ebdf.jpg",
  },
  {
    id: 5,
    name: "Karan Mehta",
    role: "Software Engineer",
    content: "DSA grind never stops 💻",
    image: "https://i.pinimg.com/736x/cd/3d/f7/cd3df7237f5960eeef6eeef316261643.jpg",
  },
  {
    id: 6,
    name: "Neha Kapoor",
    role: "HR Manager",
    content: "Hiring freshers for tech roles 👩‍💼",
    image: "https://i.pinimg.com/736x/d3/e9/2b/d3e92b5b5eef930069d621afc4e4ae78.jpg",
  },
  {
    id: 7,
    name: "Rohit Jain",
    role: "Mobile Developer",
    content: "Flutter app UI done 📱",
    image: "https://i.pinimg.com/736x/2c/6f/88/2c6f88b0f80b24e6026e985bf3ea829d.jpg",
  },
  {
    id: 8,
    name: "Anjali Singh",
    role: "AI Engineer",
    content: "Exploring machine learning 🤖",
    image: "https://i.pinimg.com/736x/ed/f1/4c/edf14c7a8d9dbd6fa4034632f3b3b85e.jpg",
  },
  {
    id: 9,
    name: "Vikas Yadav",
    role: "DevOps Engineer",
    content: "Docker + Kubernetes setup done 🐳",
    image: "https://i.pinimg.com/736x/5f/33/e6/5f33e6d2fb0341d0ee5f7c8c622c435e.jpg",
  },
  {
    id: 10,
    name: "Simran Kaur",
    role: "Product Manager",
    content: "Launching new feature today 🚀",
    image: "https://i.pinimg.com/736x/bb/c3/34/bbc334d582ec89872c2b2334b9d5bdf2.jpg",
  },
];

const Feed = () => {
  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Feed;