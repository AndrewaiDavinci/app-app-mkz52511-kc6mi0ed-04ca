import { useState } from 'react'
import ImageGallery from './components/ImageGallery'
import ImageModal from './components/ImageModal'

const galleryImages = [
  {
    id: 1,
    src: '/assets/asset.png',
    title: '마법의 숲',
    description: '신비로운 숲 속에서 펼쳐지는 환상적인 모험'
  },
  {
    id: 2,
    src: '/assets/asset_1.png',
    title: '하늘 위의 성',
    description: '구름 위에 떠있는 신비로운 성의 이야기'
  },
  {
    id: 3,
    src: '/assets/asset_2.png',
    title: '바다의 비밀',
    description: '깊은 바다 속에 숨겨진 보물과 전설'
  },
  {
    id: 4,
    src: '/assets/asset_3.png',
    title: '꿈의 정원',
    description: '계절이 바뀌어도 영원히 아름다운 정원'
  },
  {
    id: 5,
    src: '/assets/asset_4.png',
    title: '별빛 여행',
    description: '별들과 함께하는 환상적인 밤하늘 여행'
  }
]

function App() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleImageClick = (image) => {
    setSelectedImage(image)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedImage(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-slate-800 mb-2">
              지브리 갤러리
            </h1>
            <p className="text-slate-600 text-lg">
              마법과 상상이 가득한 아름다운 세계를 만나보세요
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-slate-700 mb-4">
            작품 컬렉션
          </h2>
          <p className="text-slate-600">
            각 이미지를 클릭하여 자세히 감상해보세요
          </p>
        </div>

        <ImageGallery 
          images={galleryImages}
          onImageClick={handleImageClick}
        />
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-300">
            © 2024 지브리 갤러리. 모든 권리 보유.
          </p>
        </div>
      </footer>

      {/* Modal */}
      <ImageModal
        image={selectedImage}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  )
}

export default App