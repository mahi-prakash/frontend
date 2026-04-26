import { useEffect, useRef, useState } from "react";

const WhatYouCanDoCarousel = () => {
  const containerRef = useRef(null);
  const [index, setIndex] = useState(0);

  const items = [
    {
      img: "/dragdrop2.jpg",
      tag: "EDIT LIKE A PLAYLIST",
      title: "Drag-and-drop day editing",
      body: "Rearrange days and plans with drag-and-drop while TRAP keeps routes sane.",
    },

    {
      img: "https://www.allianztravelinsurance.com/v_1628868550325/media/travel/planning/diversity-in-travel.jpg",
      tag: "GROUP-FRIENDLY",
      title: "One link for the group",
      body: "Share a single live link instead of screenshots and endless “who booked what?”.",
    },
    {
      img: "/saveshare.jpg",
      tag: "TRIP STORIES",
      title: "Save & share trip cards",
      body: "Turn finished trips into cards you can revisit, clone and share with friends.",
    },
    {
      img: "/ai.jpg",
      tag: "INSTANT PLANS",
      title: "Auto AI itineraries",
      body: "Get a day-by-day draft with flights, stays and ideas in seconds.",
    },
    {
      img: "https://images.unsplash.com/photo-1690733546551-1007bc0a3414?fm=jpg&q=60&w=900&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1vb2Rib2FyZHxlbnwwfHwwfHx8MA%3D%3D",
      tag: "ONE CLEAN BOARD",
      title: "Single board for the whole trip",
      body: "See flights, stays and activities in one calm, editable timeline.",
    },
    {
      img: "/vibebased2.jpg",
      tag: "VIBE-BASED QUIZ",
      title: "Vibe-based trip quiz",
      body: "Answer a few fun questions and TRAP learns how you actually like to travel.",
    },
  ];

  // auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [items.length]);

  // scroll to active slide
  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.scrollTo({
      left: index * containerRef.current.clientWidth,
      behavior: "smooth",
    });
  }, [index]);

  const goPrev = () =>
    setIndex((prev) => (prev - 1 + items.length) % items.length);

  const goNext = () => setIndex((prev) => (prev + 1) % items.length);

  return (
    <div className="relative">
      {/* arrows */}
      <button
        onClick={goPrev}
        className="hidden md:flex absolute -left-10 top-1/2 -translate-y-1/2
                   h-9 w-9 rounded-full bg-white
                   items-center justify-center text-slate-600"
      >
        ‹
      </button>

      <button
        onClick={goNext}
        className="hidden md:flex absolute -right-10 top-1/2 -translate-y-1/2
                   h-9 w-9 rounded-full bg-white
                   items-center justify-center text-slate-600"
      >
        ›
      </button>

      {/* slider */}
      <div
        ref={containerRef}
        className="flex overflow-hidden rounded-xl bg-white shadow-lg"
      >
        {items.map((item, i) => (
          <div
            key={i}
            className="min-w-full flex flex-col md:flex-row h-[260px]"
          >
            {/* LEFT IMAGE */}
            <div className="md:w-1/2 h-[260px]">
              <img
                src={item.img}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>

            {/* RIGHT CONTENT */}
            <div className="md:w-1/2 p-8 flex flex-col justify-center gap-3">
              <p className="text-xs font-semibold tracking-widest uppercase text-sky-600">
                {item.tag}
              </p>

              <h3 className="text-2xl font-semibold text-slate-900">
                {item.title}
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed">
                {item.body}
              </p>

              <span className="mt-2 text-sm font-medium text-sky-600 cursor-pointer">
                Read more →
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhatYouCanDoCarousel;
