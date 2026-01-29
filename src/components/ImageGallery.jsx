import { useState } from 'react'

function ImageGallery({ images = [], onImageClick }) {
  const [hoveredId, setHoveredId] = useState(null)
  const [loadedImages, setLoadedImages] = useState(new Set())

  const handleImageLoad = (imageId) => {
    setLoadedImages(prev => new Set([...prev, imageId]))
  }

  if (!images?.length) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500 text-lg">표시할 이미지가 없습니다</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {images.map((image) => (
        <div
          key={image.id}
          className="group cursor-pointer"
          onMouseEnter={() => setHoveredId(image.id)}
          onMouseLeave={() => setHoveredId(null)}
          onClick={() => onImageClick(image)}
        >
          <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
            {/* Image Container */}
            <div className="aspect-square relative overflow-hidden">
              {!loadedImages.has(image.id) && (
                <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 animate-pulse" />
              )}
              
              <img
                src={image.src}
                alt={image.title}
                className={`w-full h-full object-cover transition-all duration-500 ${
                  hoveredId === image.id ? 'scale-110' : 'scale-100'
                } ${
                  loadedImages.has(image.id) ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => handleImageLoad(image.id)}
                loading="lazy"
              />
              
              {/* Hover Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${
                hoveredId === image.id ? 'opacity-100' : 'opacity-0'
              }`} />
              
              {/* Hover Content */}
              <div className={`absolute bottom-0 left-0 right-0 p-6 text-white transform transition-all duration-300 ${
                hoveredId === image.id ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}>
                <h3 className="text-xl font-bold mb-2">{image.title}</h3>
                <p className="text-sm text-gray-200 line-clamp-2">
                  {image.description}
                </p>
              </div>
            </div>
            
            {/* Card Content */}
            <div className="p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                {image.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {image.description}
              </p>
              
              {/* View Button */}
              <div className="mt-4">
                <span className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
                  자세히 보기
                  <svg 
                    className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ImageGallery