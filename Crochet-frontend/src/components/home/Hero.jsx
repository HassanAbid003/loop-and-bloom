import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import { image } from '../../assets/image'

export default function Hero() {
  return (
    <section className="relative h-[95vh] min-h-[200px] w-full overflow-hidden">
      <img
        src={image.hero}
        alt="Handmade crochet"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

      <div className="relative h-full max-w-[1600px] mx-auto px-20 flex flex-col justify-end text-white">
        <div className="max-w-xl">
          <div className="flex items-center gap-4 mb-8">
            <span className="w-12 h-px bg-white/70" />
            <span className="text-[11px] tracking-[0.3em] uppercase">
              Made Slowly. Loved Forever.
            </span>
          </div>

          <h1 className="font-serif text-3xl md:text-8xl lg:text-[5.5rem] leading-[1.3] mb-10  whitespace-nowrap">
            Made by Hand.<br/>
            <span className="italic text-rose whitespace-nowrap mt-9">Made with Heart.</span>
          </h1>

          <p className="text-lg md:text-xl max-w-lg leading-relaxed font-light ">
            Thoughtful crochet pieces, stitched one loop at a time from our
            sunlit little studio to your home.
          </p>

          <div className="flex flex-wrap items-center gap-6 mt-10">
            <Link
              to="/shop"
              className="inline-flex items-center gap-3 bg-white text-charcoal px-8 py-4 text-xs tracking-[0.25em] uppercase hover:bg-rose hover:text-white transition-colors duration-300"
            >
              Shop New Arrivals <FiArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-3 text-xs tracking-[0.25em] uppercase pb-2 border-b border-white/60 hover:border-rose hover:text-rose transition-colors duration-300"
            >
              Discover Our Story <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="hidden lg:flex absolute right-16 top-[70%] -translate-y-1/2">
          <div className="w-32 h-32 rounded-full border border-white/40 flex flex-col items-center justify-center text-[10px] tracking-[0.2em] uppercase gap-2 animate-float">
            <span>Handmade</span>
            <span className="text-rose text-base">♡</span>
            <span>With Love</span>
          </div>
        </div>
      </div>
    </section>
  )
}