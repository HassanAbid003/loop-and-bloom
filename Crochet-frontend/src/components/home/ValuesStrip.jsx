const values = [
  { num: '01', title: 'Made by Hand', text: 'Every stitch, thoughtfully placed' },
  { num: '02', title: 'Natural Materials', text: 'Soft, lasting & responsibly sourced' },
  { num: '03', title: 'Wrapped with Care', text: 'A little joy in every parcel' },
]

export default function ValuesStrip() {
  return (
    <section className="bg-cream border-b border-sand/60">
      <div className="max-w-[1400px] mx-auto px-8 py-16 grid md:grid-cols-3 gap-12 md:gap-0 
                      md:divide-x divide-sand/60">
        {values.map((v) => (
          <div key={v.num} className="text-center px-8">
            <div className="font-serif italic text-taupe text-lg mb-2">{v.num}</div>
            <h3 className="text-sm tracking-[0.15em] uppercase font-medium mb-2">
              {v.title}
            </h3>
            <p className="text-charcoal/70 font-light">{v.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}