import { useEffect } from 'react'

function ImageModal({ image, isOpen, onClose }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen || !image) return null

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Modal Content */}
      <div 
        className="relative max-w-5xl w-full max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in-0 zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors duration-200"
          aria-label="모달 닫기"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image Container */}
        <div className="relative">
          <img
            src={image.src}
            alt={image.title}
            className="w-full max-h-[60vh] object-contain bg-gradient-to-br from-slate-100 to-slate-200"
          />
          
          {/* Image Overlay Info */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
            <h2 className="text-3xl font-bold text-white mb-2">
              {image.title}
            </h2>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Description */}
            <div>
              <h3 className="text-xl font-semibold text-slate-800 mb-4">
                작품 소개
              </h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                {image.description}
              </p>
              
              {/* Additional Info */}
              <div className="space-y-3">
                <div className="flex items-center text-sm text-slate-500">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  이미지 ID: #{image.id}
                </div>
                <div className="flex items-center text-sm text-slate-500">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.99 1.99 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  지브리 컬렉션
                </div>
              </div>
            </div>

            {/* Actions */}
            <div>
              <h3 className="text-xl font-semibold text-slate-800 mb-4">
                이미지 옵션
              </h3>
              
              <div className="space-y-3">
                <button 
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center"
                  onClick={() => window.open(image.src, '_blank')}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  새 탭에서 열기
                </button>
                
                <button 
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center"
                  onClick={() => {
                    const link = document.createElement('a')
                    link.href = image.src
                    link.download = `${image.title}.png`
                    link.click()
                  }}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  이미지 다운로드
                </button>
              </div>

              {/* Tips */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="text-sm font-medium text-blue-800 mb-2">
                  💡 감상 팁
                </h4>
                <p className="text-sm text-blue-700">
                  ESC 키를 누르거나 배경을 클릭하여 갤러리로 돌아갈 수 있습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageModal