// import React from 'react'
// import {Container,PostForm} from '../components'


// function AddPost() {
//   return (
//     <div className='py-8'>
//         <Container>
//             <PostForm/>
//         </Container>
      
//     </div>
//   )
// }

// export default AddPost


import React from 'react'
import { Container, PostForm } from '../components'

function AddPost() {
  return (
    <div className="w-full min-h-[calc(100vh-64px)] bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <Container>
        {/* Added subtle white container with shadow */}
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-6 md:p-8">
          <h1 className="text-3xl font-serif font-bold text-gray-800 mb-6 text-center">
            Create New Post
          </h1>
          <PostForm /> {/* ✅ Functionality remains unchanged */}
        </div>
      </Container>
    </div>
  )
}

export default AddPost