import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import { image } from '../../assets/image'

const collections = [
  {
    title: 'Bags',
    eyebrow: 'Carry a Little Joy',
    img: image.blueBag,
    span: 'md:row-span-2',
  },
  {
    title: 'Flowers',
    eyebrow: 'Blooms That Last',
    img: image.flowers,
  },
  {
    title: 'Wearables',
    eyebrow: 'Softly Made for You',
    img: image.sweater,
  },
  {
    title: 'Gifts',
    eyebrow: 'Small, Thoughtful Things',
    img: image.rabbit,
    span: 'md:col-span-2',
  },
]

export default function CollectionsSection() {
  return (
    <section id="collections" className="bg-ivory py-24">
      <div className="max-w-[1600px] mx-auto px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="w-12 h-px bg-taupe" />
              <span className="section-eyebrow">Find Your Favorite</span>
            </div>
            <h2 className="font-serif text-6xl md:text-7xl lg:text-8xl">
              Made for <span className="italic text-taupe">every moment</span>
            </h2>
          </div>

          <Link to="/collections" className="btn-primary">
            Shop All Collections <FiArrowRight />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:grid-rows-2 md:h-[800px]">
          {collections.map((c) => (
            <Link
              key={c.title}
              to={`/collections/${c.title.toLowerCase()}`}
              className={`group relative overflow-hidden ${c.span || ''}`}
            >
              <img
                src={c.img}
                alt={c.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 text-white">
                <div className="text-[10px] tracking-[0.3em] uppercase mb-2">
                  {c.eyebrow}
                </div>
                <div className="font-serif text-4xl">{c.title}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}