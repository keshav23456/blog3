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
import { Container, PostForm, RoleGuard } from '../components'
import { PenSquare, Sparkles } from 'lucide-react'

function AddPost() {
  return (
    <RoleGuard allowedRoles={['author', 'admin']} requireVerifiedEmail={false}>
      <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-blue-50/30 dark:from-gray-950 dark:via-purple-950/40 dark:to-blue-950/40">
        {/* Modern Header Section */}
        <div className="border-b border-gray-200 dark:border-gray-700/50 bg-white/80 dark:bg-gray-900/90 backdrop-blur-md sticky top-0 z-10 shadow-sm dark:shadow-purple-900/10">
          <Container>
            <div className="py-8">
              <div className="flex items-center justify-center gap-4 mb-3">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 shadow-lg dark:shadow-purple-500/20">
                  <PenSquare className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-purple-900 to-blue-900 dark:from-gray-100 dark:via-purple-300 dark:to-blue-300 bg-clip-text text-transparent">
                  Create New Post
                </h1>
              </div>
              <p className="text-center text-gray-600 dark:text-gray-300 flex items-center justify-center gap-2">
                <Sparkles className="h-4 w-4 text-purple-500 dark:text-purple-400" />
                <span>AI-powered writing assistant ready to help</span>
              </p>
            </div>
          </Container>
        </div>

        {/* Form Section */}
        <Container>
          <div className="py-12">
            <PostForm />
          </div>
        </Container>
      </div>
    </RoleGuard>
  )
}

export default AddPost