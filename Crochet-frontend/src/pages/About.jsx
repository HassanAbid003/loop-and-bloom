import { image } from "../assets/image"; // We'll use the existing images

export default function About() {
  return (
    <div className="py-24 bg-cream min-h-screen">
      <div className="max-w-4xl mx-auto px-8 text-center">
        <h1 className="font-serif text-5xl md:text-7xl mb-8">
          Our <span className="italic text-taupe">Story</span>
        </h1>
        <img src={image.maker} alt="The maker" className="w-full h-[500px] object-cover mb-12" />
        
        <div className="prose prose-lg mx-auto text-left text-charcoal/80 font-light leading-relaxed space-y-6">
          <p>
            Loop & Bloom began at my grandmother's kitchen table, where I learned that making something slowly is its own kind of love. 
            Today, each piece is still created by hand in small batches, with the same care in every stitch.
          </p>
          <p>
            We believe in slow fashion, natural materials, and creating things that last. Thank you for choosing handmade — 
            and for giving these pieces a place in your story.
          </p>
        </div>
      </div>
    </div>
  );
}